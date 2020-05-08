import React, { Component } from 'react'
import { connect } from 'react-redux'

import cloneDeep from 'lodash.clonedeep'
import { setConfig } from '../store/actions/config'
import { cachePokemon } from '../store/actions/database'

import { Fab, Icon, Select, MenuItem, Button } from '@material-ui/core'

import PokeAPI from '../apis/pokemon/PokeAPI'
import { types, getTypeColor } from '../apis/pokemon/PokeHelpers'

import PokemonCard from '../components/Pokemon/Card.jsx'
import SearchBar from '../components/SearchBar.jsx'

import './css/Home.css'

const init_filters = {
    name: '',
    id: '',
    types: {
        primary: '',
        secondary: ''
    }
};

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filtered_pokemon: this.props.pokemon,
            filters: cloneDeep(init_filters)
        }
    }

    temporaryGetMorePokemon = () => {
        const pokemon_ids = new Array(1).fill(0).map((n, i) => Math.floor(Math.random() * 800) + 1);
        const cached_ids = this.props.pokemon.map(p => p.id)
        const uncached_ids = pokemon_ids.filter(id => !cached_ids.includes(id))

        if (uncached_ids.length) {
            this.getPokemon(uncached_ids).then(fetched_pokemon =>
                fetched_pokemon.forEach(pokemon => {

                    // TODO: Might want to write them all to a JSON file instead of using local storage.
                    // Only keep the object properties necessary for the home screen 
                    // (name, id, types and front_default sprite)
                    // Trying to keep the entire returned object in local storage fills 
                    // up the Chrome Quota (25MB) after just 45 Pokemon
                    const { id, name, types } = pokemon
                    const sprite = pokemon.sprites.front_default

                    this.props.cachePokemon({ id, name, types, sprite })
                })
            )
        }
    }

    componentDidMount() {
        this.temporaryGetMorePokemon()
    }

    componentDidUpdate(previous_props, previous_state) {
        // If our filters have change; refilter
        if (this.state.filters !== previous_state.filters) {
            this.setState({
                filtered_pokemon: this.filter()
            })
        }
    }

    getPokemon = async namesOrIDs => {
        const pokemon_promises = await PokeAPI.getAllPokemon(namesOrIDs)
        const pokemon = await Promise.all(pokemon_promises)
        return pokemon
    }

    // by name or id
    sort = () => { }
    filterByID = id => this.setState({ filters: { ...this.state.filters, id } })
    filterByName = name => this.setState({ filters: { ...this.state.filters, name } })
    filterByTypes = types => this.setState({ filters: { ...this.state.filters, types: { ...this.state.types, ...types } } })
    
    filter = () => {
        return this.props.pokemon
            // By Name
            .filter(pokemon => pokemon.name.toLowerCase().includes(this.state.filters.name.toLowerCase()))
            
            // By Type
            .filter(pokemon => {
                const types = this.state.filters.types
                return types.primary
                        ? types.secondary
                            ? types.primary === pokemon.types[0].type.name && pokemon.types[1] && types.secondary === pokemon.types[1].type.name
                            : types.primary === pokemon.types[0].type.name
                        : true
            })
    }

    removeFilters = () => {
        this.setState({
            filters: cloneDeep(init_filters)
        })
    }

    render() {
        return (
            <div id='home'>
                <div id='header'>
                    <div id='header-top'>
                        <SearchBar onChange={e => this.filterByName(e.target.value)} />
                    </div>
                    
                    <div className='type-buttons'>
                        { types.map(type => {
                            return (
                                <button key={ type } className='type-button' 
                                    onClick={ e => this.filterByTypes({ primary: e.nativeEvent.target.textContent })}
                                    style={{ 
                                        backgroundColor: getTypeColor(type).light + 70,
                                        borderWidth: '1px',
                                        borderColor: getTypeColor(type).dark
                                    }}>
                                    { type }
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div id='content'>
                    <div id='pokemon-list'>

                        {/* Filter Overview */}
                        <div id='active-filters'>
                            <p>{ this.state.filtered_pokemon.length } Pokemon</p>

                            { Object.keys(this.state.filters)
                                .filter(key => 
                                    typeof this.state.filters[key] === 'string'
                                        ? this.state.filters[key].length > 0
                                        : this.state.filters[key].primary.length > 0
                                )
                                .map(active_filter => <p>{active_filter}</p>)
                            }
                        </div>
                        
                        {/* Pokemon Grid */}
                        { this.state.filtered_pokemon.map(pokemon => {
                            return (
                                <div key={pokemon.id} className='list-item'>
                                    <PokemonCard  pokemon={pokemon} />
                                </div>
                            )
                        })}
                    </div>

                    <div id='action-bar'>
                        <Fab variant="round" className='action-button' style={{ color: '#05F' }} onClick={this.sort}>
                            <Icon>sort</Icon>
                        </Fab>
                        <Fab variant="round" className='action-button' style={{ color: '#F00' }} onClick={this.removeFilters}>
                            <Icon>delete</Icon>
                        </Fab>
                    </div>
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        cachePokemon: pokemon => {
            dispatch(cachePokemon(pokemon))
        }
    }
}
const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon,
        search_term: state.config.search_term
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)