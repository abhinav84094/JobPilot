import puppeteer from "puppeteer";

export const scrapeLinkedInJobs = async (query) => {

    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();

    const url =
        `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(query)}&start=0`;

    await page.goto(url, {
        waitUntil: "networkidle2",
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
                    ?.href

        }));

    });

    console.log(jobs);

    await browser.close();

    return jobs;

};