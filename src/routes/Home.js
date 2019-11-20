import React, { Component } from 'react'
import { connect } from 'react-redux'

import { cachePokemon } from '../store/actions/database'

import { InputAdornment, TextField, Icon, Typography } from '@material-ui/core'

import PokeAPI from '../apis/pokemon/PokeAPI'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/SearchBar'
import './css/Home.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filtered_pokemon: this.props.pokemon
        }
    }

    componentDidMount() {
        const pokemon_ids = new Array(10).fill(0).map((n, i) => Math.floor(Math.random() * 800) + 1);
        const cached_ids = this.props.pokemon.map(p => p.id)
        const uncached_ids = pokemon_ids.filter(id => !cached_ids.includes(id))

        if (uncached_ids.length) {
            this.getPokemon(uncached_ids).then(fetched_pokemon => 
                fetched_pokemon.forEach(pokemon => {
                    // Only keep the object roperties necessary for the home screen (name, id, types and front_default sprite)
                    // Trying to keep the entire returned object in local storage fills up the Chrome Quota (25MB) after just 45 Pokemon
                    const { id, name, types } = pokemon
                    const sprite = pokemon.sprites.front_default

                    this.props.cachePokemon({ id, name, types, sprite })
                })
            )
        }
    }

    componentDidUpdate(previous_props, previous_state) {
        if (this.props.pokemon !== previous_props.pokemon) {
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
            filtered_pokemon: this.props.pokemon.filter(pokemon =>
                pokemon.name.toLowerCase().includes(name.toLowerCase())
            )
        })
    }
    
    render() {
        return (
            <div id='home'>
                <div id='header'>
                    <SearchBar onChange={e => this.filterByName(e.target.value)} />      
                </div>
               
                <div id='content'>
                    <div id='pokemon-list'>
                        {this.state.filtered_pokemon.map(pokemon => {
                            return (
                                <div key={pokemon.id} className='list-item'>
                                    <PokemonCard pokemon={ pokemon } />
                                </div>
                            )
                        })}
                    </div>

                    <div id='action-bar'>
                        <Typography>Actions</Typography>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cachePokemon: pokemon => {
            dispatch(cachePokemon(pokemon))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)