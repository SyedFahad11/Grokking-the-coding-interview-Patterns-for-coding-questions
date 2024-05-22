fetchDataFromFile('./problems.json')
  .then(problems => {

    const totalSolvedEasy = calculateTotalSolved(problems, 'Easy');
    const totalSolvedMedium = calculateTotalSolved(problems, 'Medium');
    const totalSolvedHard = calculateTotalSolved(problems, 'Hard');

    ind = Math.round(Math.random() * 217); // Generate initial index
    var count = 0;
    while (problems[ind].status === "Solved") {
      if (count > 217) {
        ind = -1;
        break;
      }

      ind = Math.round(Math.random() * 217);
      count++;
    }


    if (ind === -1) {
      const allSolvedHTML = generateAllSolvedHTML();
      document.body.innerHTML = allSolvedHTML;

    }
    else {

      problemToHTML(problems[ind], totalSolvedEasy, totalSolvedMedium, totalSolvedHard);
    }

    console.log("Loaded Successfully!")
    const showBtn = document.querySelector('.show-btn');
    const hiddenSection = document.querySelector('.hidden-section');
    if (showBtn) {
      showBtn.addEventListener('click', function () {
        if (hiddenSection.style.display === 'none') {
          hiddenSection.style.display = 'block';
          showBtn.textContent = 'Hide Patterns & Tags';
        } else {
          hiddenSection.style.display = 'none';
          showBtn.textContent = 'Show Patterns & Tags';
        }
      });
    }


  })
  .catch(error => {
    console.error('Error:', error);
  });


function calculateTotalSolved(problems, difficulty) {
  return problems.filter(problem => problem.difficulty.includes(difficulty) && problem.status === 'Solved').length;
}

function newProblem() {
  return window.location.href = `/`;
}

function redirectToAll(problemId) {
  return window.location.href = `/solved?id=${problemId}`;

}

function viewSolvedAfterAllSolved() {
  window.location.href = "/solved";
}

function topicsSolved(problemId){
  window.location.href=`/topics?id=${problemId}`;
}

function generateAllSolvedHTML() {

  return `
      <div class="all-solved-container">
          <h2>All Problems Solved!</h2>
          <p>Congratulations! You've solved all the problems.</p>
          <button class="view-solved-btn" onclick="viewSolvedAfterAllSolved()">View Solved Problems</button>

      </div>
  `;
}


function problemToHTML(problem, totalSolvedEasy, totalSolvedMedium, totalSolvedHard) {

  const totalEasy = 57;
  const totalMedium = 130;
  const totalHard = 29;
  const patterns = problem.patterns.map(pattern => pattern.name).join(', ');
  const totalSolved = totalSolvedEasy + totalSolvedMedium + totalSolvedHard;
  const totalProblems = 217;



  const problemContainer = document.createElement('div');
  problemContainer.classList.add('problem-container');

  problemContainer.innerHTML = `
        <h2>${problem.title}</h2>
        <p><strong>ID:</strong> ${problem.id}</p>
        <p><strong>Difficulty:</strong> ${problem.difficulty}</p>
        <p><strong>URL:</strong> <a href="${problem.url}">${problem.url}</a></p>
        <p><strong>Status:</strong> ${problem.status}</p>

        <button class="show-btn">Show Patterns & Tags</button>
        <div class="hidden-section">
            <p><strong>Tags:</strong> ${problem.tags.join(', ')}</p>
            <p><strong>Patterns:</strong> ${patterns}</p>
        </div>

        <br />
        <br />
        <form id="problemForm" method="post" action="/updateStatus">
            <label for="problemId">Problem ID:</label>
            <input type="text" id="problemId" name="problemId" value="${problem.id}" required>
            <button class="solved" type="submit">Solved</button>
        </form>

        <button class="generate-btn" onclick="newProblem()">Generate</button>
    `;

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card');

  cardContainer.innerHTML = `
      <h3>Total Problems Solved</h3>
      <h4>${totalSolved} / ${totalProblems}</h4>
      <p>Easy: ${totalSolvedEasy} / ${totalEasy}</p>
      <p>Medium: ${totalSolvedMedium} / ${totalMedium}</p>
      <p>Hard: ${totalSolvedHard} / ${totalHard}</p>
      <button class="solved-btn" onclick="redirectToAll('${problem.id}')">View Solved Problems</button>
      <button class="solved-btn" onclick="topicsSolved('${problem.id}')">Topics Solved</button>
  `;

  document.body.appendChild(problemContainer);
  document.body.appendChild(cardContainer);

}


async function fetchDataFromFile(filePath) {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    return data;

  }
  catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

