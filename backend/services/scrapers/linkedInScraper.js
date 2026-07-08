import { getBrowser } from "./browser.js";


/**
 * Clean LinkedIn job description
 */
const cleanDescription = (text) => {

    let cleaned = text;

    // Remove everything before About the job
    const aboutIndex = cleaned.indexOf("About the job");

    if (aboutIndex !== -1) {
        cleaned = cleaned.substring(aboutIndex);
    }

    // Remove everything after Similar jobs
    const similarIndex = cleaned.indexOf("Similar jobs");

    if (similarIndex !== -1) {
        cleaned = cleaned.substring(0, similarIndex);
    }

    return cleaned.trim();

};


/**
 * Scrape full description from job page
 */
const getJobDescription = async (page, url) => {

    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });

    // Close login popup if it appears
    try {

        await page.waitForSelector(
            'button[aria-label="Dismiss"]',
            {
                timeout: 5000,
            }
        );

        await page.click(
            'button[aria-label="Dismiss"]'
        );

        console.log("Popup closed.");

    } catch {

        console.log("No popup found.");

    }

    // Wait for page to settle
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get all visible text
    const bodyText = await page.evaluate(() => document.body.innerText);

    return cleanDescription(bodyText);

};



export const scrapeLinkedInJobs = async (query) => {

    const browser = await getBrowser();

    const page = await browser.newPage();

    try {

        const url =
            `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(query)}&location=India&geoId=102713980&start=0`;

        await page.goto(url, {
            waitUntil: "domcontentloaded",
        });

        await page.waitForSelector(".base-search-card", {
            timeout: 10000,
        });

        const jobs = await page.evaluate(() => {

            const cards = document.querySelectorAll(".base-search-card");

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

                url:
                    card.querySelector("a.base-card__full-link")
                        ?.href,

            }));

        });

        // Fetch description for every job
        await Promise.all(

            jobs.map(async (job) => {

                if (!job.url) return;

                const detailPage = await browser.newPage();

                try {

                    console.log(`Scraping: ${job.title}`);

                    job.description = await getJobDescription(
                        detailPage,
                        job.url
                    );

                } catch (err) {

                    console.log(err.message);

                    job.description = "";

                } finally {

                    await detailPage.close();

                }

            })

        );

        return jobs;

    } finally {

        await page.close();

    }

};