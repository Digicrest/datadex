import React from 'react'
import './css/Pokemon.css'
import API from '../apis/pokemon/PokeAPI'

import PokemonLoader from '../components/other/loaders/Pokemon'
import PokemonCard from '../containers/PokemonCard'
import PokemonDetails from '../containers/PokemonDetails'

function Pokemon({ name }) {
    const [fetching, setFetching] = React.useState(true)
    const [pokemon, setPokemon] = React.useState(null)

    React.useEffect(fetchPokemon, [])

    function fetchPokemon() {
        setFetching(true)

        API.getPokemon(name).then(
            pokemon => {
                setFetching(false)
                setPokemon(pokemon)
            },
            error => {
                setFetching(false)
                console.log('fetch failed:: ', error)
            }
        )
    }

    return (
        fetching
            ? <PokemonLoader name={name} />
            :   pokemon
                ? <PokemonCard pokemon={pokemon} />
                : <p>Failed</p>
    )
}

export default Pokemon
