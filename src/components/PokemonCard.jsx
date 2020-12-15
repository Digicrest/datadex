import React, { useState, useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getTypeColor } from '../apis/pokemon/LocalHelpers'

import Pokeball from './Pokeball'
import Sprite from './Pokemon/Sprite'
import Type from './Pokemon/Type'

import '../animations/bounce.css'
const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

export default function PokemonCard({ pokemon, isCaught }) {
    const classes = useStyles()
    const [fetchedPokemon, setFetchedPokemon] = useState(pokemon)
    const [backgroundColor, setBackgroundColor] = useState(getTypeColor('normal').color)
    const [nameTextColor, setNameTextColor] = useState(getTypeColor('normal').dark)
    
    //TODO: Turn back on when i've figured out how to make initial list render populated with full api details and not the basic info provided by list pagination results
    useEffect(() => {
        if (fetchedPokemon && fetchedPokemon.types) {
            const bgColor = fetchedPokemon.types.length > 1
            ?   `linear-gradient(
                    ${getTypeColor(fetchedPokemon.types[0].type.name).color}, 
                    ${getTypeColor(fetchedPokemon.types[1].type.name).color}
                )`
            :   getTypeColor(fetchedPokemon.types[0].type.name).color

            setBackgroundColor(bgColor)
            setNameTextColor(getTypeColor(fetchedPokemon.types[0].type.name).dark)
        }
    }, [fetchedPokemon])

    if (!fetchedPokemon || !fetchedPokemon.types) {
        console.log('fetchedPokemon::: ', fetchedPokemon)
        if (typeof fetchedPokemon === 'string') {
            POKEDEX.getPokemonByName(fetchedPokemon.toLowerCase()).then(response => {
                setFetchedPokemon(response)
            })
        }
        return <p>Missing Pokemon Card</p>
    }

    return (
        <Link to={`/pokemon/${fetchedPokemon.name}`} style={{ textDecoration: 'none' }}>
            <div className={`${classes.root} bounceContainerPokemonSprite`} style={{ background: backgroundColor }}>
                <div className={classes.shine}></div>

                <div style={{ flex: 2 }}>
                    <div className={classes.header}>
                        <div className={classes.idContainer}>
                            <Pokeball pokemon={fetchedPokemon} isCaught={isCaught} />
                            <Typography variant='caption' className={classes.id}>
                                #{ fetchedPokemon.id.toString().padStart(3, 0) }
                            </Typography>
                        </div>

                        <Typography variant='body1' className={classes.name} style={{ color: nameTextColor }}>
                            { fetchedPokemon.name }
                        </Typography>
                    </div>

                    <div className={classes.typesContainer}>
                        { fetchedPokemon.types.map((type, i) => 
                            <Type key={i} type={type} />
                        )}
                    </div>
                </div>
                
                <Sprite pokemon={fetchedPokemon} />
            </div>
        </Link>
    )
}

const useStyles = makeStyles({
    root: {
        minWidth: 350,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderTop: '4px solid #00000040',
        boxShadow:' 2px 2px 4px #00000030',
        '&:hover': {
            boxShadow:' 2px 2px 4px #00000060',
        }
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    idContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 10
    },
    id: {
        color: '#000',
        fontFamily: 'monospace',
        opacity: 0.6,
        fontWeight: 'bold',
        marginTop: 3
    },
    name: {
        flex: 1,
        textAlign: 'center',
        textTransform: 'capitalize',
        zIndex: 1,
    },
    typesContainer: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    shine: {
        position: 'absolute',
        top: '-80%',
        left: '-20%',
        width: '90%',
        height: '200%',
        background: 'linear-gradient(#FFF, transparent)',
        opacity: 0.6,
        borderRadius: '50%',
    }
})
