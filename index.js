const express = require("express");
const cors = require("cors")
const path = require('path');
const bodyParser = require("body-parser")
const fs = require('fs').promises;



const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/Problems')));
app.use(express.static(path.join(__dirname, 'views/Solved')));
app.use(express.static(path.join(__dirname, 'data')));

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, 'views/Problems/index.html'));
});

app.get('/solved', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/Solved/index.html'));
})

async function read(file) {
  try {
    const data = await fs.readFile(file, 'utf8');
    const jsonArray = JSON.parse(data);
    return jsonArray;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }

}

async function write(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data written to file successfully');
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
}





const port=5000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
