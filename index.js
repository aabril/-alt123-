const express = require('express');
const app = express();

const index = require('./routes/index.js');

app.get('/', index);

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));