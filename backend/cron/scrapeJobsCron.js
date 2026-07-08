import cron from "node-cron";

import { scrapeLinkedInJobs } from "../services/scrapers/linkedInScraper.js";
import { closeBrowser } from "../services/browser.js";

const JOB_ROLES = [

    // "Backend Developer",

    // "Frontend Developer",

    // "Full Stack Developer",

    "React Developer",

    "Node.js Developer",

    "MERN Developer",

    // "Java Developer",

    // "Python Developer",

    // "Software Engineer",

];

const runScraper = async () => {

    console.log("====================================");
    console.log("Job Scraping Started");
    console.log("Time :", new Date().toLocaleString());
    console.log("====================================");

    const startTime = Date.now();

    for (const role of JOB_ROLES) {

        try {

            console.log(`\nScraping ${role}...\n`);

            await scrapeLinkedInJobs(role);

        }

        catch (err) {

            console.log(`Failed : ${role}`);

            console.log(err.message);

        }

    }

    await closeBrowser();

    const seconds =
        ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("====================================");
    console.log("Job Scraping Completed");
    console.log(`Execution Time : ${seconds} sec`);
    console.log("====================================");

};

export const startJobScraper = () => {

    console.log("Job Scheduler Started");

    // Initial Scrape
    runScraper();

    // Every 30 Minutes
    cron.schedule("*/30 * * * *", async () => {

        await runScraper();

    });

};