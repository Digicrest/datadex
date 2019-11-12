import React, { Component } from 'react'
import { InputAdornment, TextField, Icon, Button, Typography  } from '@material-ui/core'

import PokeAPI from '../apis/pokemon/PokeAPI'
import PokemonCard from '../components/PokemonCard.js'

import './css/Home.css'

class Home extends Component {
    state = {
        pokemon: [],
        filtered_pokemon: []
    }

    componentDidMount() {
        this.getPokemon([30,  60, 90, 120, 150]).then(pokemon => {
            this.setState({ pokemon }, () => console.log('Updated State: ', this.state))
        })
    }

    componentDidUpdate(previous_props, previous_state) {
        if (this.state.pokemon !== previous_state.pokemon) {
            this.filterByName('')
        }
    }

    getPokemon = async namesOrIDs => {
        const pokemon_promises = await PokeAPI.getPokemon(namesOrIDs)
        const pokemon = await Promise.all(pokemon_promises)
        return pokemon
    }

    filterByName = name => {
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

                            onChange={ e => this.filterByName(e.target.value) }
                        />
                    </div>           
                </div>
               
                <div id='content'>
                    <div style={ styles.pokemon_list }>
                        {this.state.filtered_pokemon.map(pokemon => 
                            <PokemonCard key={pokemon.name} pokemon={ pokemon } />
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