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
    var contents = fs.readFileSync('./resources/wordlist.txt');
    // lowercase word list and remove duplicates
    this.wordList = [...new Set(contents
      .toString()
      .split(/\n/)
      .map(w => w.toLowerCase())
    )];
    this.indexableChars = [...new Set([...source, ...target])];
    this.index = {};
    if (autoTokenize) {
      this.tokenizeWords(this.wordList);
    }
  }

  addWord(word, wordListIndex) {
    if (!this._shouldIndex(word)) return;

    word = word.toLowerCase();
    for (var i=0; i < word.length; i++) {
      let tokenized = this.tokenize(word, i);
      let existingToken = this.index[tokenized];
      if (existingToken) {
        this.index[tokenized] = existingToken.concat(wordListIndex);
      } else {
        this.index[tokenized] = [wordListIndex];
      }
    }
  }

  tokenizeWords(words) {
    words.forEach((word, i) => this.addWord(word, i));
  }

  // todo - take source and target args here so reinitialization is unnecessary
  findChain() {
    function mapCandidates(word, otherWord) {
      let len = word.length;
      let candidates = [...word].map((_v, i) => this.index[this.tokenize(word, i)]);
      let accepted = [];
      let otherWordReg = new RegExp(`[${otherWord}]`);
      candidates.map((array) => {
        let words = array.map(i => this.wordList[i])
                         // filter words that have a letter from the other word
                         .filter((w) => w.match(otherWordReg));
        accepted = accepted.concat(words);
      });
      // remove dups and sort
      return Array.from(new Set(accepted)).sort();
    };

    let sourceCandidates = mapCandidates.bind(this)(this.source, this.target);
    let targetCandidates = mapCandidates.bind(this)(this.target, this.source);
    debugger;
    console.log("need to find the chain now");
  }

  // Takes a word and replaces the character at the offset with a '@'
  tokenize(word, offset) {
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
