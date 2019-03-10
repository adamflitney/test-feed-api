const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userFeedController = require('./user-feed/userFeedController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/userfeed', (req, res) => { userFeedController.getUserFeed(req, res) } );

app.listen(process.env.PORT || 3000, () => {
    console.log(`user-feed-api is running on port ${process.env.PORT || 3000}`);
});