const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { generateToken, refreshToken } = require("./auth");
const path = require('path')
const PORT = 8080;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/api/assets', express.static(__dirname + '/reports'));

console.log(__dirname + '/reports')


app.post("/api/login", urlencodedParser, (req, res) => {
  const { grant_type, username, password } = req.body;
  const rToken = req.body.refresh_token;
  const isRefreshToken = grant_type === "refresh_token";
  const { access_token, refresh_token } = isRefreshToken
    ? refreshToken(rToken)
    : generateToken(username);
  res.send({
    access_token,
    refresh_token,
    role: "cc",
    status: "ACTIVE",
    authorities: ["UV"]
  });
});

app.get("/api/reports/:model/:keys", urlencodedParser, (req, res) => {
  const { model, keys } = req.params
  const csvFilePath = path.join(__dirname, 'reports', model, keys, 'corpus.csv')
  const imagesPaths = [1, 2, 3].map(num => path.join('/api/assets', model, keys, `resultplots-00${num}.jpg`))
  const csv = require('csvtojson')
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.send({
        data: jsonObj,
        imagesPaths
      })
    })
});


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
