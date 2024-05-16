fetchDataFromFile('./problems.json')
  .then(problems => {
    console.log(problems[0]);
    problemToHTML(problems[0])

  })
  .catch(error => {
    console.error('Error:', error);
  });

function problemToHTML(problem) {

  const patterns = problem.patterns.map(pattern => pattern.name).join(', ');


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

  document.body.appendChild(problemContainer);

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

