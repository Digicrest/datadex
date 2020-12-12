import React, { useEffect, useState } from 'react'
import { Button, Icon, Typography, Input, makeStyles } from '@material-ui/core'

import PokeAPI from '../apis/pokemon/PokeAPI'

export default function About() {
    let [search, setSearch] = useState('')
    let [pokemon, setPokemon] = useState() 

    useEffect(() => {
        console.log('pokemon:', pokemon)
    }, [pokemon])

    const fetchPokemon = () => {
        PokeAPI.getPokemonDetails(search).then(details => {
            setPokemon(details)
        })
    }

    return (
        <div>
            <Input placeholder={'Pokemon Name or ID'} onChange={e => setSearch(e.target.value)}/>

            <Button variant="text" color="primary" onClick={fetchPokemon} style={{ marginLeft: 10 }}>
                <Icon style={{ marginRight: 5 }}>link</Icon>
                <Typography>Fetch</Typography>
            </Button>

            { pokemon && (
                <div style={{ marginTop: 20,  border: '1px solid black', padding: 5 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', margin: 5 }}>
                        <h3 style={{ textAlign: 'center' }}>Images</h3>
                        <div style={{ padding: 10 }}>
                            <img src={pokemon.pokemon.sprites.front_default} height={150}/>
                            <img src={pokemon.pokemon.sprites.back_default} height={150}/>
                            <img src={pokemon.betterSprite} height={300}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}