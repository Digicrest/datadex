import assert from 'assert'

import PokeAPI from '../apis/pokemon/PokeAPI'

describe('PokeAPI', function() {
  describe('Fetch Pokemon By ID', function() {
    it ('Should Return a Pokemon JSON', async function() {
        const pokemonJSON = await PokeAPI.getPokemon(25)
        assert.strictEqual(pokemonJSON.name.toLowerCase(), 'pikachu')
    })

    it ('Should Fail to Return a Pokemon JSON', async function() {
        assert.rejects( await PokeAPI.getPokemon(999))
        // assert.strictEqual(pokemonJSON.name.toLowerCase(), 'pikachu')
    })
  })
})