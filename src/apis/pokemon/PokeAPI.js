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
    // REFACTOR: Try to Bundle Multiple Requests into a Single Request


    // WHY THE FUCK are you returning a promise
    getAllPokemon = async pokemonNamesOrIDs => {  
        if (!pokemonNamesOrIDs.length) {
            console.error('[PokeAPI] getPokemon() - No Names or IDs, if you want to Get All Pokemon use \'getAllPokemon()\'')
            return null
        }

        // if we pass through just a single name or id; wrap in array
        if (typeof pokemonNamesOrIDs !== 'object'){
            pokemonNamesOrIDs = [pokemonNamesOrIDs]
        }

        const results = await pokemonNamesOrIDs.map(nameOrID => this.getPokemon(nameOrID))

        return results
    }



    getPokemon = async nameOrID => {
        const url = `${this.base_url}/pokemon/${nameOrID}`
   
        const response = await fetch(url)

        if (response.ok) {
            const pokemonJSON = await response.json()
            console.log('[PokeAPI] getPokemon(): ', pokemonJSON)
            return pokemonJSON
        } else {
            console.log('[PokeAPI] getPokemon(): Unable to Find Pokemon: ', nameOrID)
        }

        return []
    }
}



export default new PokeAPI()