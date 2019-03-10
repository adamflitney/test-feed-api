const  userFeedModel = require('./userFeedModel');

//  Return all feed data, grouped by likes and comments
//  and then by post.
const getUserFeed = (req, res) => {
    res.json(aggregateFeedData(userFeedModel.getFeedData()));
}


// ** Main Logic **

const aggregateFeedData = (feedData) => {
    if (feedData.length > 0) {
        let likes = feedData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "like");
        let comments = feedData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "comment");
        let likesByPost = Object.values(groupByPost(likes));
        let commentsByPost = Object.values(groupByPost(comments));

        return {
            likesByPost,
            commentsByPost
        };
    }
    else {
        return {
            error: 'No feed data'
        }
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
    getUserFeed,
    aggregateFeedData,
    groupByPost
}
