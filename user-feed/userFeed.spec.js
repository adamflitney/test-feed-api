const userFeedController = require('./userFeedController');
const sampleData = require('../notifications-feed.json');

describe('aggregateFeedData', () => {
    const result = userFeedController.aggregateFeedData(sampleData);
    const errorResult = userFeedController.aggregateFeedData({});
    it('should return an object', () => {
       typeof result === 'object';
    });
    it('should contain an object called "likesByPost"', () => {
        result['likesByPost'];
    })
    it('should contain an object called "commentsByPost"', () => {
        result['commentsByPost'];
    })
    it('should return property called "error" if there is no feed data', () => {
        errorResult['error'];
    })
})

describe('groupByPost', () => {
    const filteredData = sampleData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "like");
    const result = Object.values(userFeedController.groupByPost(filteredData));
    it('should add a property called "name" for each post object', () => {
        result.every(post => {
            post.name;
        });
    });
    it('should remove redundant post objects from individual items', () => {
        result.every(post => {
            post.items.every(item => {
                !item.post;
            });
        });
    });
})