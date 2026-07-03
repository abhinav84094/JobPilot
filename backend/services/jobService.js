import { scrapeLinkedInJobs } from "./scrapers/linkedinScraper.js";
import { scrapeNaukriJobs } from "./scrapers/naukriScraper.js";

export const searchJobs = async (query) => {

    const linkedInJobs = await scrapeLinkedInJobs(query);

    const naukriJobs = await scrapeNaukriJobs(query);

    return [
        ...linkedInJobs,
        ...naukriJobs,
    ];

};