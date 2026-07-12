import { getBrowser } from "../browser.js";
import Job from "../../models/Job.js";

import { parsePostedDate } from "../../utils/parsePostedDate.js";
import { isFreshJob } from "../../utils/isFreshJob.js";

import {
    extractSkills,
    calculateExperienceEligibility,
} from "../recommendationService.js";

/**
 * Clean LinkedIn Description
 */
const cleanDescription = (text = "") => {

    let cleaned = text;

    const aboutIndex = cleaned.indexOf("About the job");

    if (aboutIndex !== -1) {
        cleaned = cleaned.substring(aboutIndex);
    }

    const similarIndex = cleaned.indexOf("Similar jobs");

    if (similarIndex !== -1) {
        cleaned = cleaned.substring(0, similarIndex);
    }

    return cleaned.trim();

};

/**
 * Scrape Job Description
 */
const getJobDescription = async (page, url) => {

    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });

    try {

        await page.waitForSelector(
            'button[aria-label="Dismiss"]',
            {
                timeout: 3000,
            }
        );

        await page.click(
            'button[aria-label="Dismiss"]'
        );

    }
    catch {}

    try {

        await page.waitForSelector(
            ".show-more-less-html__markup",
            {
                timeout: 5000,
            }
        );

        const description =
            await page.$eval(
                ".show-more-less-html__markup",
                el => el.innerText
            );

        return cleanDescription(description);

    }
    catch {

        const body =
            await page.evaluate(
                () => document.body.innerText
            );

        return cleanDescription(body);

    }

};

/**
 * Scrape LinkedIn Jobs
 */
export const scrapeLinkedInJobs = async (query) => {

    const browser = await getBrowser();

    const page = await browser.newPage();

    const url =
        `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(query)}&location=India&geoId=102713980&start=0`;

    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });
    

    await page.waitForSelector(".base-search-card");

    const jobs = await page.evaluate(() => {

        const cards =
            document.querySelectorAll(".base-search-card");

        return [...cards].map(card => ({

            title:
                card.querySelector(".base-search-card__title")
                    ?.innerText
                    ?.trim(),

            company:
                card.querySelector(".base-search-card__subtitle")
                    ?.innerText
                    ?.trim(),

            location:
                card.querySelector(".job-search-card__location")
                    ?.innerText
                    ?.trim(),

            jobUrl:
                card.querySelector("a.base-card__full-link")
                    ?.href,

            postedText:
                card.querySelector("time")
                    ?.innerText
                    ?.trim(),

        }));

    });

    const validJobs = jobs.filter(job =>
        job.title &&
        job.company &&
        job.jobUrl &&
        job.postedText
    );

    const operations = [];

    for (const job of validJobs) {

        job.postedDate =
            parsePostedDate(job.postedText);

        if (!isFreshJob(job.postedDate)) {

            console.log(
                `Skipped ${job.title} (${job.postedText})`
            );

            continue;

        }

        console.log(
            `Scraping ${job.title}`
        );

        const detailPage =
            await browser.newPage();

        try {

            job.description =
                await getJobDescription(
                    detailPage,
                    job.jobUrl
                );

            // LinkedIn login page
            if (
                !job.description ||
                job.description.includes("Join LinkedIn") ||
                job.description.includes("Agree & Join") ||
                job.description.includes("Sign in")
            ) {

                console.log(
                    `Blocked: ${job.title}`
                );

                continue;

            }

            const experience =
                calculateExperienceEligibility(
                    [],
                    job.description
                );

            job.requiredSkills =
                extractSkills(
                    job.description
                );

            if (
                job.requiredSkills.length === 0
            ) {

                console.log(
                    `No skills found : ${job.title}`
                );

            }

            job.requiredExperienceMonths =
                experience.requiredMonths;    
                const jobKey = 
                `${job.company.trim().toLowerCase()}-${job.title.trim().toLowerCase()}-${job.location.trim().toLowerCase()}`;

                operations.push({

                updateOne: {

                    filter: {
                        platform: "linkedin",
                        jobKey
                    },

                    update: {

                        $set: {
                            jobKey,

                            title: job.title,

                            company: job.company,

                            location: job.location,

                            platform: "linkedin",

                            jobUrl: job.jobUrl,

                            // Uncomment if you want to save description
                            // description: job.description,

                            requiredSkills:
                                job.requiredSkills,

                            requiredExperienceMonths:
                                job.requiredExperienceMonths,

                            postedDate:
                                job.postedDate,

                            scrapedAt:
                                new Date(),

                            status: "active",

                            expiredAt: null,

                        },

                    },

                    upsert: true,

                },

            });

        }
        catch (err) {

            console.log(
                `Error scraping ${job.title}`
            );

            console.log(err.message);

        }
        finally {

            await detailPage.close();

        }

    }

    await page.close();

    if (operations.length === 0) {

        console.log(
            `No new jobs found for ${query}`
        );

        return {

            success: true,

            query,

            fetched: validJobs.length,

            processed: 0,

        };

    }

    const result =
        await Job.bulkWrite(
            operations
        );

    console.log("========================================");

    console.log(
        `Query      : ${query}`
    );

    console.log(
        `Fetched    : ${validJobs.length}`
    );

    console.log(
        `Processed  : ${operations.length}`
    );

    console.log(
        `Inserted   : ${result.upsertedCount}`
    );

    console.log(
        `Updated    : ${result.modifiedCount}`
    );

    console.log("========================================");

    return {

        success: true,

        query,

        fetched: validJobs.length,

        processed: operations.length,

    };

};