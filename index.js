const express = require("express");
const cors = require("cors")
const path = require('path');
const bodyParser = require("body-parser")


const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));




const port=8765;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
