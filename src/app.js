const bodyParser = require('body-parser');
const express = require('express');

const getWord = require('./getWord.js');
const code = require('../utils/statusCodes.js');

const STATUS_USER_ERROR = 422;

const app = express();
const port = process.env.PORT || 8080;

const wordToGuess = 'art';
const guesses = [];

app.use(bodyParser.json());

const alreadyGuessed = (letter) => {
  return guesses.indexOf(letter) !== -1;
};

app.get('/api', (req, res) => {
  const wordSoFar = wordToGuess
    .split('')
    .map(letter => (alreadyGuessed(letter) ? '-' : letter))
    .join('');

  res.json({ wordSoFar, guesses });
});

app.post('/api/guess', (req, res) => {
  const { letter } = req.body;

  if (!letter || alreadyGuessed(letter)) {
    res.status(code.STATUS_USER_ERROR);
    res.json({ error: 'Error Message' });
    return;
  }

  guesses.push(letter);
  res.status(code.STATUS_CREATED);
  res.json({ success: 'true', guess: letter });
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
  });
}

module.exports = { app, guesses };
