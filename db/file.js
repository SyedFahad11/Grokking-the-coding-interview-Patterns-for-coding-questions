const fs = require('fs');
const problems=require('./init/problems')
//console.log(problems[0])
// Read the file

const writePath='D:\\GitHub\\Grokking\\db\\final.json';

const modifiedProblems = problems.map(problem => {

  const { solutions, companies, ...newProblem } = problem;
  const obj={
    ...newProblem,
    status:'UnSolved'
  }
  return obj;
});


const modifiedData = JSON.stringify(modifiedProblems, null, 2);


fs.writeFile(writePath, modifiedData, 'utf8', (err) => {
  if (err) {
      console.error('Error writing file:', err);
      return;
  }
  console.log('File updated successfully.');
});