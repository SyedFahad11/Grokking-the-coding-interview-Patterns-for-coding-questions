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

app.post("/updateStatus", async (req, res) => {

  const problemId = req.body.problemId;

  updateStatusAndWrite(problemId)
    .then(() => {
      console.log('Status updated and data written to files successfully');
    })
    .catch(error => {
      console.error('Error updating status and writing data:', error);
    });

  res.redirect('/');

  function getDateTime() {

    const currentDate = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    let hours = currentDate.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const formattedHours = (hours < 10 ? '0' : '') + hours;
    const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

    const dateTimeString = `${formattedDate} | ${formattedTime}`;

    return dateTimeString;

  }

  async function updateStatusAndWrite(problemId) {
    try {
      const problems = await read('./data/problems.json');

      const problemIndex = problems.findIndex(problem => problem.id === problemId);
      if (problemIndex === -1) {
        throw new Error('Problem not found');
      }

     // problems[problemIndex].status = 'Solved';

      await write('./data/problems.json', problems);

      const solvedData = await read('./data/solved.json');


      const dateTimeString = getDateTime();

      const newData = { ...problems[problemIndex], date: dateTimeString };
      solvedData.push(newData);

      await write('./data/solved.json', solvedData);


    } catch (error) {
      console.error('Error updating status and writing data:', error);
      throw error;
    }
  }




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





const port = 5000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
