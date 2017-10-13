var assert = require('assert');
var WordChain = require('../index');

describe('WordChain', function() {
  describe('#findChain()', function() {
    it('finds candidates', function() {
      let results = new WordChain('cat', 'dog').findChain2();
      assert(results, ['cat', 'dat', 'dot', 'dog']);
    });
  });
});


