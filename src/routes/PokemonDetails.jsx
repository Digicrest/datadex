import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { makeStyles, Typography } from '@material-ui/core'
import { getBetterSprite } from '../apis/pokemon/LocalHelpers'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

function PokemonDetails({ name }) {
    const classes = useStyles();

    const [fetching, setFetching] = useState(false)
    const [pokemon, setPokemon] = useState({})
    const [mainSpriteURL, setMainSpriteURL] = useState('')

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

    if (fetching) {
        return <LoadingSpinner name={name} />
    }

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography className={classes.pokemonName} variant='h4'>{fetching ? 'Fetching Details...' : pokemon.name}</Typography>
                <img src={mainSpriteURL} style={{ width: 200, height: 200, margin: 10 }}/>
            </div>

            <div style={{
                backgroundColor: '#eee',
                border: '1px solid black',
                padding: 10,
                margin: 10,
                borderRadius: 5,
                maxHeight: 300,
                overflow: 'scroll'
            }}>
                <Typography variant='body1'>
                    {JSON.stringify(pokemon, 0, 2)}
                </Typography>
            </div>
        </div>
    )
}

export default PokemonDetails

const useStyles = makeStyles({
    root: {
        flex: 1,
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    }
})