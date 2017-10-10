'use strict';
var fs = require('fs');
/** Finds word chains
* Example usage:
*/
class WordChain {
  constructor() {
    var contents = fs.readFileSync('./resources/wordlist.txt');
    this.wordList = contents.toString().split(/\n/);
  }

  levenshteinDistance(source, target) {
    if (source.length === 0) return target;
    if (target.length === 0) return source;

    let matrix = []

  }
}
module.exports = WordChain;
