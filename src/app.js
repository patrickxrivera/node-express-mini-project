const bodyParser = require('body-parser');
const express = require('express');

const getWord = require('./getWord.js');
const code = require('../utils/statusCodes.js');

const STATUS_USER_ERROR = 422;

const app = express();
const port = process.env.PORT || 8080;
let wordToGuess;

const guesses = [];

app.use(bodyParser.json());

const alreadyGuessed = (letter) => {
  return guesses.indexOf(letter) !== -1;
};

const buildWord = letter => (alreadyGuessed(letter) ? '-' : letter);

app.get('/api', (req, res) => {
  wordToGuess = process.env.NODE_ENV === 'test' ? 'art' : getWord();

  const wordSoFar = wordToGuess
    .split('')
    .map(buildWord)
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

module.exports = { app, guesses, wordToGuess };
