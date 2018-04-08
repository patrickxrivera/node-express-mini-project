const fs = require('fs');

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

const getRandNumUpTo = (num) => {
  return Math.floor(Math.random() * num);
};

const getRandWord = (words) => {
  const randNum = getRandNumUpTo(words.length);
  const randWord = words[randNum];
  return randWord;
};

const getWord = () => {
  const words = readWords();
  const randWord = getRandWord(words);
  return randWord;
};

module.exports = getWord;
