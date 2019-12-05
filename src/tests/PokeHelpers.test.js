import assert from 'assert'

import { types } from '../apis/pokemon/PokeHelpers'

describe('PokeHelpers', function() {
  describe('Pokemon Types', function() {
    it ('Has All Pokemon Types', function() {
        assert.strictEqual(types.length , 18)
    })
  })
})