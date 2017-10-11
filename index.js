'use strict';
var fs = require('fs');
// var levenshtein = require('levenshtein');

/** Finds word chains
* Example usage:
*/
String.prototype.poorManLevenshtein(target) {
  let source = this.toLowerCase().split('');
  let target = target.toLowerCase().split('');

  // todo - this probably won't work as order matters
  return source.filter(function(char) { return target.indexOf(char) < 0; }).length;
};

class WordChain {
  constructor() {
    var contents = fs.readFileSync('./resources/wordlist.txt');
    this.wordList = contents.toString().split(/\n/);
  }


}
module.exports = WordChain;
