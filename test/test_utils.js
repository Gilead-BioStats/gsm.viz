var assert = require('chai').assert;
import coalesce from "../src/util/coalesce.js";

describe('utility functions', function () {

  describe('coalesce functionality', function () {
    it('should return default value when first argument null', function () {
        assert.equal(coalesce(null, "test"), "test")
      });
    it('should return value when it is not null or undefined', function () {
        assert.equal(coalesce('test', 'other'), 'test')
      });
  });

})