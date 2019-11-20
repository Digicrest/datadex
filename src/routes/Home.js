import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setConfig } from '../store/actions/config'
import { cachePokemon } from '../store/actions/database'

import { Fab, Icon, Typography } from '@material-ui/core'

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

    temporaryGetMorePokemon = () => {
        const pokemon_ids = new Array(2).fill(0).map((n, i) => Math.floor(Math.random() * 800) + 1);
        const cached_ids = this.props.pokemon.map(p => p.id)
        const uncached_ids = pokemon_ids.filter(id => !cached_ids.includes(id))

        if (uncached_ids.length) {
            this.getPokemon(uncached_ids).then(fetched_pokemon => 
                fetched_pokemon.forEach(pokemon => {

                    // TODO: Might want to write them all to a JSON file instead of using local storage.
                    // Only keep the object roperties necessary for the home screen (name, id, types and front_default sprite)
                    // Trying to keep the entire returned object in local storage fills up the Chrome Quota (25MB) after just 45 Pokemon
                    const { id, name, types } = pokemon
                    const sprite = pokemon.sprites.front_default

                    this.props.cachePokemon({ id, name, types, sprite })
                })
            )
        }
    }

    componentDidMount() {
        this.temporaryGetMorePokemon()

        if (this.props.search_term.length) {
            this.filterByName(this.props.search_term)
        }
    }

    componentDidUpdate(previous_props, previous_state) {
       
    }

    getPokemon = async namesOrIDs => {
        const pokemon_promises = await PokeAPI.getPokemon(namesOrIDs)
        const pokemon = await Promise.all(pokemon_promises)
        return pokemon
    }

    filterByName = name => {
        this.props.setConfig('search_term', name)
      
        this.setState({
            filtered_pokemon: this.props.pokemon.filter(pokemon =>
                pokemon.name.toLowerCase().includes(name)
            )
        })
    }
    
    render() {
        return (
            <div id='home'>
                <div id='header'>
                    <SearchBar defaultValue={ this.props.search_term } onChange={e => this.filterByName(e.target.value)} />       
                </div>
               
                <div id='content'>
                    <div id='pokemon-list'>
                        {this.state.filtered_pokemon.map(pokemon => {
                            return (
                                <div className='list-item'>
                                    <PokemonCard key={pokemon.id} pokemon={ pokemon } />
                                </div>
                            )
                        })}
                    </div>

                    <div id='action-bar'>
                        <Fab variant="round" className='action-button' style={{ color: '#05F' }}>
                            <Icon>sort</Icon>
                        </Fab>
                        <Fab variant="round" className='action-button' style={{ color: '#F00' }}>
                            <Icon>delete</Icon>
                        </Fab>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon,
        search_term: state.config.search_term
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cachePokemon: pokemon => {
            dispatch(cachePokemon(pokemon))
        },

        setConfig: (prop, val) => {
            dispatch(setConfig(prop, val))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)