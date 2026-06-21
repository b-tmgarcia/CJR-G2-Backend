const axios = require('axios');
axios.post('http://localhost:3001/login', {email: "john@example.com", senha: "password"}).then(console.log).catch(e => console.log(e.response.data));
