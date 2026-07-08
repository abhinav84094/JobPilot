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

    // ---------- Minutes ----------

    let match = text.match(/(\d+)\s*(minute|minutes|min|m)/);

    if (match) {

        const date = new Date(now);

        date.setMinutes(
            date.getMinutes() - Number(match[1])
        );

        return date;
    }

    // ---------- Hours ----------

    match = text.match(/(\d+)\s*(hour|hours|hr|hrs|h)/);

    if (match) {

        const date = new Date(now);

        date.setHours(
            date.getHours() - Number(match[1])
        );

        return date;
    }

    // ---------- Days ----------

    match = text.match(/(\d+)\s*(day|days|d)/);

    if (match) {

        const date = new Date(now);

        date.setDate(
            date.getDate() - Number(match[1])
        );

        return date;
    }

    // ---------- Weeks ----------

    match = text.match(/(\d+)\s*(week|weeks|w)/);

    if (match) {

        const date = new Date(now);

        date.setDate(
            date.getDate() - Number(match[1]) * 7
        );

        return date;
    }

    // ---------- Months ----------

    match = text.match(/(\d+)\s*(month|months|mo)/);

    if (match) {

        const date = new Date(now);

        date.setMonth(
            date.getMonth() - Number(match[1])
        );

        return date;
    }

    return null;

};