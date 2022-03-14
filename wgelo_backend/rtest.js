var request = require("request");
const axios = require("axios");



var options = { method: 'POST',
  url: 'https://chalkchaser.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"Sj3mGeOhmuV2R846WHOVXKWnNmXFRSo2","client_secret":"t4wBomSRvmwhIL1kHhzKBLz9Z7oLX-hwrPk3F0ejnTEK7PaDJIZkS6YE5y6xR-cO","audience":"https://wgelo/api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(JSON.parse(body)["access_token"]);
  console.log("response is ", response)

  const options = { 
    method: "GET",
    url: "http://localhost:3001/api/private",
    headers: { "authorization": "Bearer " + JSON.parse(body)["access_token"] },
  };

 
  
  axios(options)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});
