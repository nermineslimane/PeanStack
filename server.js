const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors());
// drop existing tables and re-sync database
db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
});
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PeanStack app.' });
});

// routes
require('./routes/freelancer.routes')(app);
require('./routes/project.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
