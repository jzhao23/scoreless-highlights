const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, ()=>{console.log("server listening on port 3000...")});

app.route("/")

.get((req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.route("/video")

.get((req, res)=>{
  // const {
  //   team1,
  //   team2
  // } = req.params;
  console.log(req);

  const team1 = req.query.team1;
  const team2 = req.query.team2;

  console.log(team1);
  console.log(team2);
  
  res.send("team 1 is " + team1 + " and team 2 is " + team2);
});