
fetchDataFromFile('./solved.json')
  .then(data => {

    addRowsToTable(data);

  })
  .catch(error => {
    console.error('Error:', error);
  });
function redirect() {
  const queryParams = new URLSearchParams(window.location.search);
  const param = queryParams.get('id');
  console.log(param);

  return window.location.href = `/?id=${param}`;

}

function addRowsToTable(data) {
  const tableBody = document.querySelector('#problems-table tbody');
  const len = data.length;

  for (let i = 0; i < len; i++) {
    const title = data[i].title;
    const id = data[i].id;
    const difficulty = data[i].difficulty;
    const date = data[i].date;
    const url = `problem-url-${i + 1}`;

    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = id;
    row.appendChild(idCell);

    const titleCell = document.createElement('td');
    const titleLink = document.createElement('a');
    titleLink.href = url;
    titleLink.textContent = title;
    titleCell.appendChild(titleLink);
    row.appendChild(titleCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = date;
    row.appendChild(dateCell);

    const difficultyCell = document.createElement('td');
    difficultyCell.textContent = difficulty;
    row.appendChild(difficultyCell);

    const buttonCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Delete';
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

    button.addEventListener('click', function () {
      console.log(id);
      const data = {
        id: id
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      fetch('/remove', options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response from /remove endpoint:', data);
          const row = button.parentElement.parentElement;
          row.remove();
        })
        .catch(error => {
          console.error('Error sending POST request:', error);

        });

    });

    tableBody.appendChild(row);
  }
}

async function fetchDataFromFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
