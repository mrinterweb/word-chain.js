'use strict';
var fs = require('fs');

/** Finds word chains
* Example usage:
*   new WordChain('cat', 'dog').findChain();
*/
class WordChain {
  constructor(source, target, autoTokenize=true) {
    this.source = source;
    this.target = target;
    [this.minLength, this.maxLength] = [source.length, target.length].sort();
    this.indexableChars = [...new Set([...source, ...target])];
    var contents = fs.readFileSync('./resources/wordlist.txt');
    // lowercase word list and remove duplicates
    this.wordList = [...new Set(contents
      .toString()
      .split(/\n/)
      .map(w => w.toLowerCase())
      .filter(w => this._shouldIndex(w))
    )];
    this.index = {};
    if (autoTokenize) {
      this._tokenizeWords(this.wordList);
    }
  }

  _addWord(word, wordListIndex) {
    for (var i=0; i < word.length; i++) {
      let tokenized = this._tokenize(word, i);
      let existingToken = this.index[tokenized];
      if (existingToken) {
        this.index[tokenized] = existingToken.concat(wordListIndex);
      } else {
        this.index[tokenized] = [wordListIndex];
      }
    }
  }

  _tokenizeWords(words) {
    words.forEach((word, i) => this._addWord(word, i));
  }

  // Finds the word chain
  // This uses a breadth first traversal strategy that calls this function
  // recusively as it traverses to deeper levels
  findChain(word=null, wordChain=[], matchedPositions=[]) {
    word = word || this.source;
    wordChain = wordChain.concat(word);

    // If the word is the target, the chain is complete
    if (word === this.target) return wordChain;

    // I left this logger in here because I think it is interesting to see how it gets to the result
    console.log('current chain', wordChain, 'with matched positions', matchedPositions);

    let tokens = [...word].map((v, i) => this._tokenize(word, i));

    for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
      if (matchedPositions.indexOf(tokenIndex) === -1) {
        let token = tokens[tokenIndex];

        for (let wordIndex of this.index[token]) {
          let word2 = this.wordList[wordIndex];
          // Avoid non-terminating loop by checking if already in chain
          if (wordChain.indexOf(word2) === -1) {
            // recursive call
            let newChain = this.findChain(word2, wordChain, matchedPositions.concat(tokenIndex));

            if (newChain && newChain[newChain.length - 1] === this.target) {
              return newChain;
            }
          }
        }
      }
    }
  }

  // Takes a word and replaces the character at the offset with a '@'
  _tokenize(word, offset) {
    return word.slice(0, offset) + '@' + word.slice(offset + 1, word.length);
  }

  // determines if the word is worthy of being indexed
  // note: originally performed these checks with regex, but that was much slower
  _shouldIndex(word) {
    let len = word.length;
    // Is the length of the word in the range of the source and target?
    if (len < this.minLength || len > this.maxLength) return false;

    // Does the word contains at least one character from either source or target words?
    return [...word].find(char => this.indexableChars.indexOf(char)) !== undefined;
  }
}
module.exports = WordChain;
