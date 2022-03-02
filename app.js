const express = require("express");
const app = express();

require("dotenv").config();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const { google } = require("googleapis");


function getDate(){
  let weekBeforeDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return weekBeforeDate.toISOString();
}

app.listen(3000, ()=>{console.log("server listening on port 3000...")});

app.route("/")

.get((req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.route("/video")

.get((req, res)=>{
  const team1 = req.query.team1;
  const team2 = req.query.team2;
  const dateLimit = getDate();
  const searchQuery = team1 + " vs " + team2 + " " + "NBC Sports highlights";

  google.youtube('v3').search.list({
    key: process.env.YT_TOKEN,
    part: "snippet",
    q: searchQuery,
    channelId: process.env.NBC_CHANNEL_ID,
    maxResults: 1,
    publishedAfter: dateLimit
  }).then((response)=>{
    const videoId = response.data.items[0].id.videoId;
    const redirectUrl = "https://www.youtube.com/watch?v=" + videoId + "&t=1";
    res.redirect(redirectUrl);
  }).catch((err)=>{console.log(err)});

});