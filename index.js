const express = require("express");
const cors = require("cors")
const path = require('path');
const bodyParser = require("body-parser")


const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'data')));

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, 'views/Problems/index.html'));
});

app.get('/solved', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/Solved/index.html'));
})



const port=8765;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
