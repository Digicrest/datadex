import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PokeAPI from '../apis/pokemon/PokeAPI'

import { Input,InputAdornment, TextField} from '@material-ui/core'

import './css/Home.css'

class Home extends Component {
    getPokemon = async () => {
        const pikachu = await PokeAPI.getPokemon('')
        console.log('got: ', pikachu)
    }

    render() {
        return (
            <div id='home'>
                <div id='header'>
                    <div id='searchbar'>
                        <Input />
                    </div>

                    <TextField
                        id="input-with-icon-textfield"
                        label="TextField"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                
                            </InputAdornment>
                        ),
                        }}
                    />
                </div>
               
                <div id='content'>
                    <div id='pokemon-list'>
                        Pokemon List
                    </div>

                    <div id='action-bar'>
                        Actions
                    </div>
                </div>
              

                {/* <PokemonCard />
                <Button variant="contained" color="primary" onClick={ this.getPokemon }>
                    Fetch
                </Button> */}
              
            </div>
        )
    }
}

export default Home
