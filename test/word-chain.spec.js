var assert = require('assert');
var WordChain = require('../index');

describe('WordChain', function() {
  describe('#findChain()', function() {
    it('finds the chain for cat & dog', function() {
      let results = new WordChain('cat', 'dog').findChain();
      assert.notStrictEqual(results, ['cat', 'dat', 'dot', 'dog']);
    });

    it('finds the chain for truck & car', function() {
      let results = new WordChain('ham', 'cow').findChain();
      assert.notStrictEqual(results, ["ham", "cam", "com", "cow"]);
    });
  });
});


