
fetchDataFromFile('./patterns.json')
  .then(patternsArray => {
    const solvedArray = Array(30).fill(0);
    const totalArray = Array(30).fill(1);
    addRowsToTable(patternsArray,solvedArray,totalArray);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  function addRowsToTable(patternsArray, solvedArray, totalArray) {

    const table = document.getElementById('patternsTable');


    if (!table) {
      console.error('Table element not found!');
      return;
    }


    for (let i = 0; i < patternsArray.length; i++) {

      const row = document.createElement('tr');


      const patternCell = document.createElement('td');
      patternCell.textContent = patternsArray[i];
      row.appendChild(patternCell);

      const solvedCell = document.createElement('td');
      solvedCell.textContent = solvedArray[i];
      row.appendChild(solvedCell);

      const totalCell = document.createElement('td');
      totalCell.textContent = totalArray[i];
      row.appendChild(totalCell);


      table.appendChild(row);
    }
  }

  function redirect() {
    const queryParams = new URLSearchParams(window.location.search);
    const param = queryParams.get('id');
    console.log(param);

    return window.location.href = `/?id=${param}`;

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
