
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



fetchDataFromFile('./problems.json')
  .then(problems => {
      console.log(problems[0]);

  })
  .catch(error => {
    console.error('Error:', error);
  });

