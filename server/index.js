const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const encoder = require('./encoder').default;
const DB = require('./db').default;
const db = new DB();
const dir = path.resolve(__dirname, '../.data/');

db.init(dir);


app.use(express.static( path.join(__dirname, "../client")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "../client"));
app.set("view engine", "hbs");

app.get('/', (request, response) => {
  response.render("index");
});

app.get('/:short', async (request, response) => {
  const short = request.params.short;
  const index = encoder.decode(short);
  const url = await db.getUrl(index);

  if (url === undefined) {
    response.sendFile(path.resolve(__dirname, '../client/404.html'));
  } else {
    response.redirect(url);
  }
});

app.post('/add-url', async (request, response) => {
  const { url } = request.body;

  const { index, count } = await db.addUrl(url);
  if (index === undefined) {
    response.render("index");
  }

  const shortUrl = `${request.headers.host}/${encoder.encode(index)}`;

  response.render("index", { shortUrl, count });
});

const listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);