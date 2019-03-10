const sampleData = require('../notifications-feed.json');

const getFeedData = () => {
    // This would get data from a DB or API in a real application
    return sampleData;
}

module.exports = {
    getFeedData
}