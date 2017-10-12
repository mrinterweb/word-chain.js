var assert = require('assert');
var WordChain = require('../index');

describe('WordChain', function() {
  describe('#findChain()', function() {
    it('finds candidates', function() {
      let results = new WordChain('cat', 'dog').findChain();
      assert.equal(results, ['cat', 'cot', 'cog', 'dog']);
    });
  });
});


