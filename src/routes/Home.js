import React, { Component } from 'react'
import { connect } from 'react-redux'

import { cachePokemon } from '../store/actions/database'

import { InputAdornment, TextField, Icon, Typography, Container } from '@material-ui/core'

import PokeAPI from '../apis/pokemon/PokeAPI'
import PokemonCard from '../components/PokemonCard.js'

import './css/Home.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filtered_pokemon: this.props.cached_pokemon
        }
    }

    componentDidMount() {
        const pokemon_ids = [9,10,11,12,13,14,15,16];
        const cached_ids = this.props.cached_pokemon.map(p => p.id)
        const uncached_ids = pokemon_ids.filter(id => !cached_ids.includes(id))

        if (uncached_ids.length) {
            this.getPokemon(uncached_ids).then(fetched_pokemon => 
                fetched_pokemon.forEach(fp => this.props.cachePokemon(fp))
            )
        }
    }

    componentDidUpdate(previous_props, previous_state) {
        if (this.props.cached_pokemon !== previous_props.cached_pokemon) {
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
            filtered_pokemon: this.props.cached_pokemon.filter(pokemon =>
                pokemon.name.toLowerCase().includes(name.toLowerCase())
            )
        })
    }
    
    render() {
        return (
            <div id='home'>
                <div style={ styles.header }>
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
               
                <div style={ styles.content }>
                    <div style={ styles.pokemon_list }>
                        {this.state.filtered_pokemon.map(pokemon => {
                            return (
                                <div style={ styles.list_item }>
                                    <PokemonCard key={pokemon.name} pokemon={ pokemon } />
                                </div>
                            )
                        })}
                    </div>

                    <div style={ styles.action_bar }>
                        <Typography>Actions</Typography>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cached_pokemon: state.database.pokemon
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

const styles = {
    
    header: {
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        borderRadius: '15px',
        borderLeft: '2px solid red',
        borderRight: '2px solid red',
        marginBottom: '10px'
    },


    content: {
        display: 'flex',
        // height: '80%',
        maxHeight: '80%',
    },

    pokemon_list: {
        width: '85%',
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '15px',
        backgroundColor: '#EFEFEF',
        padding: '20px',
        overflow: 'auto',
        margin: 0
    },

    list_item: {
        width: '50%'
    },

    action_bar: {
        marginLeft: '5%',
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid purple',
        borderRadius: '15px'
    }
}