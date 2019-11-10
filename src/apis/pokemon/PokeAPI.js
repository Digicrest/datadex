class PokeAPI {
    constructor() {
        this.base_url = 'https://pokeapi.co/api/v2'
    }

    getPokemon = async pokemonNameOrID => {
        if (!pokemonNameOrID) {
            console.error('[PokeAPI] getPokemon() - Invalid Name or ID, if you want to Get All Pokemon use \'getAllPokemon()\'')
            return null
        }

        const url = `${this.base_url}/pokemon/${pokemonNameOrID}`
       
        const pokemon = await fetch(url)
        const pokemonJSON = await pokemon.json()

        return pokemonJSON
    }
}

export default new PokeAPI()