import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Typography } from '@material-ui/core'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'
import Loader from '../components/Loader'

import './css/PokemonDetails.css'

import PokeAPI from '../apis/pokemon/PokeAPI'

class PokemonDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemon: null,
            fetching: false,
            haveAPIDetails: false
        }

        this.detailPageStyle = { }
    }

    setStyles = () => {
        const {pokemon} = this.state
        this.detailPageStyle = {
            background: pokemon.types.length > 1 
                ? `linear-gradient(${getTypeColor(pokemon.types[0].type.name).light}, ${getTypeColor(pokemon.types[1].type.name).color})`
                : getTypeColor(pokemon.types[0].type.name).light,

            borderRadius: 10
        }
    }

    componentDidMount() {
       
        const indexOfPokemon = this.props.pokemon.map(pokemon => pokemon.name).indexOf(this.props.name)
        const pokemon = this.props.pokemon[indexOfPokemon]

        this.setState({ pokemon, fetching: true }, async () => {
            const fetched_pokemon = await PokeAPI.getPokemon(pokemon.id)
            const species = await PokeAPI.get(fetched_pokemon.species.url)

            const description = species.flavor_text_entries.filter(fte => fte.language.name === 'en')[0].flavor_text
            this.setState({ fetching: false, pokemon: { ...fetched_pokemon, description } }, this.setStyles)
        })
    }

    componentDidUpdate(previous_props, previous_state) {
        // if we finished fetching
        if (previous_state.fetching && !this.state.fetching) {
            console.log(this.state.pokemon)
            if (this.state.pokemon.hasOwnProperty('order')) {
                this.setState({ haveAPIDetails: true })
            }
        }
    }

    _FullPokemon = () => {
        const { pokemon } = this.state;

        // Top - Section ( Name, Sprites, Types)
        const _overview = () => {
            return (
                <div className='section details-overview'>
                    {/* name */}
                    <p className='details-pokemon-name'>{pokemon.name}</p>   

                    {/* sprites */}
                    <div id='details-sprites' style={{
                        background: pokemon.types.length > 1 
                            ? `linear-gradient(${getTypeColor(pokemon.types[0].type.name).color}, ${getTypeColor(pokemon.types[1].type.name).color})`
                            : getTypeColor(pokemon.types[0].type.name).color 
                    }}>
                        <img src={ pokemon.sprites.front_default } />
                        <img src={ pokemon.sprites.back_default } />
                    </div>
    
                    {/* types */}
                    <div className='details-types'>
                        { pokemon.types.map((type, i) => 
                            <p key={i} className='details-type'>{ type.type.name.toUpperCase() }</p>
                        )}
                    </div>
                    
                    {/* stats */}
                    <div className='details-stats'>
                        { pokemon.stats.map((stat, i) => {
                            return (
                                <div className='details-stat' key={i}>
                                    <p>{ stat.stat.name.split('-').join(' ') }</p>
                                    <p style={{ fontWeight: 'bold' }}>{ stat.base_stat }</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        return (
            <Container>
                { _overview() }

                <div className='section details-content'>
                    {/* description */}
                    <div className='details-description'>
                        <p>{ pokemon.description }</p> 
                    </div>
                </div>
            </Container>
        )
    }

    _LimitedPokemon = () => {
        return <p>_LimitedPokemon</p>
    }

    render() {
        const { pokemon } = this.state
        return (
            this.state.pokemon
            ?   <Container id='details-pokemon' style={ this.detailPageStyle }>
                    { this.state.fetching
                        ? <Loader />
                        : this.state.haveAPIDetails
                            ? this._FullPokemon()
                            : this._LimitedPokemon()
                    }
                </Container>
            : <Loader />
        )
    }
}


const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon
    }
}

export default connect(mapStateToProps)(PokemonDetails)
