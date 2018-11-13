const app = require('./src/app')
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Open http://localhost:3000 to see a response.`)
});

module.exports = app