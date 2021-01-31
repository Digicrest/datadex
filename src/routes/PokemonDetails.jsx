import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { makeStyles, Typography } from '@material-ui/core'
import { getBetterSprite, getTypeColor } from '../apis/pokemon/LocalHelpers'

import PokemonAbilities from '../components/PokemonAbilities'
import PokemonSpecies from '../components/PokemonSpecies'
import PokemonMoves from '../components/PokemonMoves'
import MoveCategories from '../components/MoveCategories'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

function PokemonDetails({ name }) {
    const classes = useStyles()
    const [fetching, setFetching] = useState(false)
    const [pokemon, setPokemon] = useState(null)
    const [colors, setColors] = useState({ light: '#FFF', dark: '#FFF', color: '#FFF' })
    const [mainSpriteURL, setMainSpriteURL] = useState('')
    const [moveCategory, setMoveCategory] = useState('level-up')

    useEffect(() => {
        if (pokemon) {
            setColors(getTypeColor(pokemon.types[0].type.name))
        }
    }, [pokemon])

    useEffect(() => {
        setFetching(true)
        POKEDEX.getPokemonByName(name.toLowerCase()).then(pokemon => {
            setFetching(false)
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

    const handleMoveCategoryChanged = category => {
        setMoveCategory(category)
    }

    return (
        <div className={classes.root} style={{ backgroundColor: colors.light }}>
            <div className={classes.section}>
                <Typography style={{ color: colors.dark }} className={classes.pokemonName} variant='h4'>
                    {pokemon.name}
                </Typography>
                <img src={mainSpriteURL} style={{ width: 200, height: 200 }} alt='' />
            </div>

            <div className={classes.section}>
                <Typography variant='h6' className={classes.title} style={{ color: colors.dark }}>
                    Species
                </Typography>
                <PokemonSpecies pokemon={pokemon} colors={colors} />
            </div>

            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-evenly',
            }}>
                <div className={classes.section}>
                    <Typography variant='h6' className={classes.title} style={{ color: colors.dark }}>
                        Abilities
                    </Typography>
                    <PokemonAbilities pokemon={pokemon} colors={colors} />
                </div>
                <div className={classes.section}>
                    <Typography variant='h6' className={classes.title} style={{ color: colors.dark }}>
                        Moves
                    </Typography>
                    <MoveCategories onChanged={handleMoveCategoryChanged} />
                    <PokemonMoves filter={moveCategory} moves={pokemon.moves} />
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        height: '100vh',
        padding: theme.spacing(2)
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    section: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        margin: theme.spacing(2)
    }
}))