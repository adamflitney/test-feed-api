const sampleData = require('../notifications-feed.json');

//  Return all feed data, grouped by likes and comments
//  and then by post.
//  Up to client to aggregate further.
const getUserFeedFull = (req, res) => {
    res.json(aggregateFeedData(getFeedData()));
}
 
//  Return only essential aggregated data for the feed
//  reducing amount of data sent to client.
//  Client will need to request data individually for each
//  specific post
const getUserFeedBasic = (req, res) => {
    res.json(getFeedData());
}

//  Corresponding functions to retrieve specific data for a post

const getPostLikes = (req, res, postID) => {
    res.json(getFeedData());
}

const getPostComments = (req, res, postID) => {
    res.json(getFeedData());
}


const getFeedData = () => {
    // This would get data from a DB or API in a real application
    return sampleData;
}


// ** Internal Functions **

const aggregateFeedData = (feedData) => {
    if(feedData.length > 0) {
        let posts = feedData.map(feedItem => {
           if(feedItem.post && feedItem.post.id) {
               return feedItem.post.id;
           }
        });
        let uniquePosts = [...new Set(posts)];
        let likes = feedData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "like");
        let comments = feedData.filter(feedItem => feedItem.type && feedItem.type.toLowerCase() === "comment");
        let likesByPost = groupByPost(likes);
        let commentsByPost = groupByPost(comments);
        console.log(likesByPost);
        // console.log(posts);
        console.log(commentsByPost);
        // console.log(likes);
        // console.log(comments);

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
    getUserFeedFull,
    getUserFeedBasic,
    getPostLikes,
    getPostComments
}
