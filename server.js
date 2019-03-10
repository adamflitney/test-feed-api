const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userFeed = require('./controllers/userFeed');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/userfeed', (req, res) => { userFeed.getUserFeedFull(req, res) } );

app.listen(process.env.PORT || 3000, () => {
    console.log(`user-feed-api is running on port ${process.env.PORT || 3000}`);
});