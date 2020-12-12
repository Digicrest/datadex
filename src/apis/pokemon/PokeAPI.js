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

    getPokemon = async (nameOrID = '') => {
        if (typeof nameOrID === 'string') {
            nameOrID = nameOrID.toLowerCase()
        }
        
        const url = `${this.base_url}/pokemon/${nameOrID}`
        const response = await fetch(url)

        if (response.ok) {
            const pokemonJSON = await response.json()
            console.log('[PokeAPI] getPokemon(): ', pokemonJSON)
            return pokemonJSON
        }

        console.log('[PokeAPI] getPokemon(): Unable to Find Resource for URL: ', url)
        return []
    }

    getBetterSprite = async (pokemonID) => {
        const spriteURL = `https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png`
        const response = await fetch(spriteURL)
        return response;
    } 

    getPokemonDetails = async (nameOrID) => {
        if (typeof nameOrID !== "string") {
            nameOrID = nameOrID.toLowerCase();
        }

        const pokemon = await this.getPokemon(nameOrID)
        const betterSprite = await this.getBetterSprite(pokemon.id)
        
        const pokemonDetails = { 
            pokemon, 
            betterSprite: betterSprite.url 
        };

        return pokemonDetails;
    }

    testFetchNews = () => {
        const url = 'https://www.pokemon.com/us/pokemon-news/rss'
        fetch(url).then(response => 
            console.log(response)
        )
    }
}



export default new PokeAPI()