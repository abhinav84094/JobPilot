export const isFreshJob = (postedDate) => {

    if (!postedDate) {
        return false;
    }

    const diff =
        Date.now() - postedDate.getTime();

    const hours =
        diff / (1000 * 60 * 60);

    return hours <= 36;

};