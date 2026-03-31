const axios = require('axios');

async function testRoute() {
  try {
    const response = await axios.get('http://localhost:3000/api/rentas/listar', {
      headers: {
        'x-token': 'test'
      }
    });
    console.log('Response:', response.status, response.data);
  } catch (error) {
    console.log('Error:', error.response ? error.response.status : error.message);
    console.log('Data:', error.response ? error.response.data : 'No data');
  }
}

testRoute();