const  userFeedModel = require('./userFeedModel');

//  Return all feed data, grouped by likes and comments
//  and then by post.
//  Up to client to aggregate further.
const getUserFeed = (req, res) => {
    res.json(aggregateFeedData(userFeedModel.getFeedData()));
}


// ** Internal Functions **

const aggregateFeedData = (feedData) => {
    if (feedData.length > 0) {
        let posts = feedData.map(feedItem => {
            if (feedItem.post && feedItem.post.id) {
                return feedItem.post.id;
            }
        });
        let uniquePosts = [...new Set(posts)];
        let likes = feedData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "like");
        let comments = feedData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "comment");
        let likesByPost = groupByPost(likes);
        let commentsByPost = groupByPost(comments);

        return {
            likesByPost,
            commentsByPost
        };
    }
}

const groupByPost = (objectArray) => {
    return objectArray.reduce((acc, obj) => {
        var key = obj.post.id;
        // Add post title before array and remove
        // redundant post objects from each array item
        if (!acc[key]) {
            acc[key] = {
                title: obj.post.title,
                items: []
            };
        }
        cleanedObj = obj;
        delete cleanedObj.post;
        delete cleanedObj.type;
        acc[key].items.push(cleanedObj);
        return acc;
    }, {});
}


module.exports = {
    getUserFeed
}
