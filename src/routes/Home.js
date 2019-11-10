import React, { Component } from 'react'

import { InputAdornment, TextField, Icon, Button, Typography  } from '@material-ui/core'

import PokemonCard from '../components/PokemonCard.js'

import PokeAPI from '../apis/pokemon/PokeAPI'

import './css/Home.css'
const pikachu = require('../resources/dummy_data/pikachu.json')
const charmander = require('../resources/dummy_data/charmander.json')
const bulbasaur = require('../resources/dummy_data/bulbasaur.json')

class Home extends Component {
    state = {
        pokemon: [pikachu, charmander, bulbasaur],
        filtered_pokemon: [pikachu, charmander, bulbasaur]
    }

    // componentDidMount(){
    //     this.getPokemon([1,2,3])
    // }

    // getPokemon = async namesOrIDs => {
    //     const pokemon = await PokeAPI.getPokemon(namesOrIDs)
    //     console.log(pokemon)
    //     return pokemon
    // }
    filterByName = e => {
        const name = e.target.value
        this.setState({
            filtered_pokemon: this.state.pokemon.filter(pokemon =>
                pokemon.name.includes(name.toLowerCase())
            )
        })
    }
    
    render() {
        return (
            <div id='home'>
                <div id='header'>
                    <div id='searchbar'>
                        <TextField
                            id="search-input"
                            label="Filter By Name"
                            autoComplete='off'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" className='search-icon'>
                                        <Icon>search</Icon>
                                    </InputAdornment>
                                )
                            }}

                            onChange={ this.filterByName }
                        />
                    </div>

                   
                </div>
               
                <div id='content'>
                    <div style={ styles.pokemon_list }>
                        {this.state.filtered_pokemon.map(pokemon => 
                            <PokemonCard pokemon={ pokemon } />
                        )}
                    </div>

                    <div id='action-bar'>
                        <Typography>Actions</Typography>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

const styles = {
    pokemon_list: {
        width: '85%',

        borderRadius: '15px',
        backgroundColor: '#FAFAFA',
        padding: '20px',
        overflow: 'auto'
    }
}