import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { makeStyles, Typography } from '@material-ui/core'
import { getBetterSprite, getTypeColor } from '../apis/pokemon/LocalHelpers'

import PokemonAbilities from '../components/PokemonAbilities'
import PokemonSpecies from '../components/PokemonSpecies'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

function PokemonDetails({ name }) {
    const classes = useStyles()
    const [fetching, setFetching] = useState(false)
    const [pokemon, setPokemon] = useState(null)
    const [colors, setColors] = useState({ light: '#FFF', dark: '#FFF', color: '#FFF' })
    const [mainSpriteURL, setMainSpriteURL] = useState('')

    useEffect(() => {
        if (pokemon) {
            setColors(getTypeColor(pokemon.types[0].type.name))
        }
    }, [pokemon])

    useEffect(() => {
        setFetching(true)
        POKEDEX.getPokemonByName(name.toLowerCase()).then(pokemon => {
            setFetching(false)
            console.log(pokemon)
            setPokemon(pokemon)
            setMainSpriteURL(getBetterSprite(pokemon.id))
        }, error => {
            setFetching(false)
            console.error('fetch failed:: ', error)
        })
    }, [name])

    if (fetching || !pokemon) {
        return <LoadingSpinner name={name} />
    }

    return (
        <div className={classes.root} style={{ backgroundColor: colors.light }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ color: colors.dark }} className={classes.pokemonName} variant='h4'>
                    {pokemon.name}
                </Typography>
                <img src={mainSpriteURL} style={{ width: 200, height: 200, margin: 10 }} alt='' />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h6' className={classes.title} style={{ color: colors.dark }}>
                    Species
                </Typography>
                <PokemonSpecies pokemon={pokemon} colors={colors} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h6' className={classes.title} style={{ color: colors.dark }}>
                    Abilities
                </Typography>
                <PokemonAbilities pokemon={pokemon} colors={colors} />
            </div>
        </div>
    )
}

export default PokemonDetails

const useStyles = makeStyles({
    root: {
        flex: 1,
        height: '100vh',
        padding: 20
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    }
})