import React, { useEffect, useState } from 'react'
import { Button, Icon, Typography, Input } from '@material-ui/core'

const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

export default function About() {
    let [search, setSearch] = useState('')
    let [pokemonFromDex, setPokemonFromDex] = useState() 
    
    useEffect(() => {
        console.log('pokemonFromDex:', pokemonFromDex)
    }, [pokemonFromDex])

    const fetchPokemon = () => {
        P.getPokemonByName(search.toLowerCase()).then(response => {
            setPokemonFromDex(response)
        })
    }

    return (
        <div>
            <Input placeholder={'Pokemon Name or ID'} onChange={e => setSearch(e.target.value)}/>

            <Button variant="text" color="primary" onClick={fetchPokemon} style={{ marginLeft: 10 }}>
                <Icon style={{ marginRight: 5 }}>link</Icon>
                <Typography>Fetch</Typography>
            </Button>

            { pokemonFromDex && (
                <div style={{ marginTop: 20,  border: '1px solid black', padding: 5 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', margin: 5 }}>
                        <h3 style={{ textAlign: 'center' }}>Images</h3>
                        <div style={{ padding: 10 }}>
                            <img src={pokemonFromDex.sprites.front_default} height={150}/>
                            <img src={pokemonFromDex.sprites.back_default} height={150}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}