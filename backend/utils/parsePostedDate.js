/**
 * Converts LinkedIn posted time into a JavaScript Date.
 *
 * Supported formats:
 *
 * Today
 * Just now
 * Yesterday
 *
 * 30 minutes ago
 * 2 hours ago
 * 5 days ago
 * 2 weeks ago
 * 1 month ago
 *
 * 30m
 * 2h
 * 5d
 * 2w
 * 1mo
 */

export const parsePostedDate = (postedText) => {

    if (!postedText) {
        return null;
    }

    const text = postedText
        .toLowerCase()
        .trim();

    const now = new Date();

    // Today / Just Now
    if (
        text.includes("today") ||
        text.includes("just now")
    ) {
        return new Date(now);
    }

    // Yesterday
    if (text.includes("yesterday")) {

        const date = new Date(now);

        date.setDate(date.getDate() - 1);

        return date;
    }

    let match;

    // Years
    match = text.match(/(\d+)\s*(years?|yr|yrs|y)\b/);
    if (match) {
        const date = new Date(now);
        date.setFullYear(date.getFullYear() - Number(match[1]));
        return date;
    }

    // Months
    match = text.match(/(\d+)\s*(months?|mo)\b/);
    if (match) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - Number(match[1]));
        return date;
    }

    // Weeks
    match = text.match(/(\d+)\s*(weeks?|w)\b/);
    if (match) {
        const date = new Date(now);
        date.setDate(date.getDate() - Number(match[1]) * 7);
        return date;
    }

    // Days
    match = text.match(/(\d+)\s*(days?|d)\b/);
    if (match) {
        const date = new Date(now);
        date.setDate(date.getDate() - Number(match[1]));
        return date;
    }

    // Hours
    match = text.match(/(\d+)\s*(hours?|hrs?|hr|h)\b/);
    if (match) {
        const date = new Date(now);
        date.setHours(date.getHours() - Number(match[1]));
        return date;
    }

    // Minutes
    match = text.match(/(\d+)\s*(minutes?|mins?|min|m)\b/);
    if (match) {
        const date = new Date(now);
        date.setMinutes(date.getMinutes() - Number(match[1]));
        return date;
    }
    return null;

};