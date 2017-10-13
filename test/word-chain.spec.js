var assert = require('assert');
var WordChain = require('../index');

describe('WordChain', function() {
  describe('#findChain()', function() {
    [
      ['cat', 'dog', ['cat', 'dat', 'dot', 'dog']],
      ['ham', 'cow', ['ham', 'cam', 'com', 'cow']],
      ['fly', 'cry', ['fly', 'cly', 'cry']],
      ['cake', 'limp', ['cake', 'lake', 'like', 'lime', 'limp']],
      ['word', 'size', ['word', 'sord', 'sore', 'sire', 'size']],
      ['cole', 'warm', ['cole', 'cale', 'wale', 'ware', 'warm']],
      ['funny', 'pants', ['funny', 'punny', 'punty', 'punts', 'pants']]
    ].forEach(scenario => {
      let [source, target, expected] = scenario;
      it(`finds the chain for ${source} & ${target}`, function() {
        let result = new WordChain(source, target).findChain();
        assert.deepEqual(result, expected);
      });
    });
  });
});


