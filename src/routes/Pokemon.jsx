import React from 'react'
import './css/Pokemon.css'
import API from '../apis/pokemon/PokeAPI'

import PokemonLoader from '../components/other/loaders/Pokemon'
import PokemonCard from '../containers/PokemonCard'
import PokemonDetails from '../containers/PokemonDetails'

function Pokemon({ name }) {
    const [fetching, setFetching] = React.useState(false)
    const [pokemon, setPokemon] = React.useState(null)

    React.useEffect(fetchPokemon, [])

    function fetchPokemon() {
        let longFetch = setTimeout(() => {
            setFetching(true)
        }, 500)

        API.getPokemon(name).then(
            pokemon => {
                clearTimeout(longFetch)
                setFetching(false)
                setPokemon(pokemon)
            },
            error => {
                clearTimeout(longFetch)
                setFetching(false)
                console.log('fetch failed:: ', error)
            }
        )
    }

    return (
        fetching
            ? <PokemonLoader name={name} />
            :   pokemon
                ?   <>
                        <PokemonCard pokemon={pokemon} />
                        <PokemonDetails pokemon={pokemon} />
                     </>
                :   <></>
    )
}

export default Pokemon
