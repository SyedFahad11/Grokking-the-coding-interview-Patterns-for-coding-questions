
fetchDataFromFile('./patterns.json')
  .then(data => {
    console.log(data);

  })
  .catch(error => {
    console.error('Error:', error);
  });

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
