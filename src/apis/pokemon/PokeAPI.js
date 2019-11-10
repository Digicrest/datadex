class PokeAPI {
    constructor() {
        this.base_url = 'https://pokeapi.co/api/v2'
    }

    // Many Resources return properties which are urls to the relevant data
    get = async url => {
        const resource = await fetch(url)
        const resourceJSON = await resource.json()

        return resourceJSON
    }

    // Take an array of Pokemon Names or IDs and returns detailed information about each Pokemon
    // FIXME: Try to Bundle Multiple Requests into a Single Request
    getPokemon = async pokemonNamesOrIDs => {
        if (!pokemonNamesOrIDs.length) {
            console.error('[PokeAPI] getPokemon() - No Names or IDs, if you want to Get All Pokemon use \'getAllPokemon()\'')
            return null
        }

        const results = await pokemonNamesOrIDs.map(async nameOrID => {
            const url = `${this.base_url}/pokemon/${nameOrID}`
       
            const pokemon = await fetch(url)
            const pokemonJSON = await pokemon.json()

            return pokemonJSON
        });
       
        return results
    }
}

export default new PokeAPI()