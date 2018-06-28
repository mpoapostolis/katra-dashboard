const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { generateToken, refreshToken } = require("./auth");
const path = require('path')

const PORT = 8080;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/api/assets', express.static(__dirname + '/reports'));
app.use('/api/models', express.static(__dirname + '/models'));

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

app.get("/api/reports", urlencodedParser, (req, res) => {
  const { model, search_word, stop_words, startDate, endDate } = req.query
  const search = search_word.replace(' ', '+')
  const fileName = `${search}_${startDate}-${endDate}`
  const csvFilePath = path.join(__dirname, 'reports', model, fileName, 'corpus.csv')
  const imagesPaths = [1, 2, 3].map(num => path.join('/api/assets', model, fileName, `resultplots-00${num}.jpg`))
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
