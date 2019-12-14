import assert from 'assert'

import { types, palette } from '../apis/pokemon/PokeHelpers'

describe('PokeHelpers', function() {
  describe('Pokemon Types', function() {
    it ('Has All 18 Pokemon Types', function() {
        assert.strictEqual(types.length , 18)
    })
  })

  describe('Pokemon Stats', function() {
    it ('Has All 6 Pokemon Stats', function() {
        assert.strictEqual(Object.keys(palette.stats).length, 6)
    })
  })
})