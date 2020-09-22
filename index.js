const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');

const contactsRouter = require('./api/contacts/router');
var morgan = require('morgan');

var app = express();
app.use(morgan('combined'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', '*');
  res.setHeader('Access-Control-Allow-Method', '*');
  next();
});

app.use(express.json());
app.use('/', contactsRouter);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
