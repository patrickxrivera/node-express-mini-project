const bodyParser = require('body-parser');
const express = require('express');

const getWord = require('./getWord.js');
const code = require('../utils/statusCodes.js');

const STATUS_USER_ERROR = 422;

const app = express();
const port = process.env.PORT || 8080;
const wordToGuess = 'art';

app.use(bodyParser.json());

app.post('/api/guess', (req, res) => {
  if (req.body.letter) {
    res.status(code.STATUS_CREATED);
    res.json({ success: 'true', guess: req.body.letter });
    return;
  }

  res.status(code.STATUS_USER_ERROR);
  res.json({ error: 'Error Message' });
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
  });
}

module.exports = app;
