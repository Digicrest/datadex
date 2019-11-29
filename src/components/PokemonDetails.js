import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Typography, Icon } from '@material-ui/core'
import PokeSprite from 'react-poke-sprites'
import { getTypeColor } from '../apis/pokemon/PokeHelpers'
import Loader from '../components/Loader'

import './css/PokemonDetails.css'

import PokeAPI from '../apis/pokemon/PokeAPI'
import PokemonCard from './PokemonCard'

class PokemonDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemon: null,
            gif: null,
            fetching: false,
            haveAPIDetails: false,



            shownAbility: null
        }

        this.detailPageStyle = { }
    }

    setStyles = () => {
        const {pokemon} = this.state
        this.detailPageStyle = {
            // background: pokemon.types.length > 1 
            //     ? `linear-gradient(${getTypeColor(pokemon.types[0].type.name).light}, ${getTypeColor(pokemon.types[1].type.name).color})`
            //     : getTypeColor(pokemon.types[0].type.name).light,

            backgroundColor: getTypeColor(pokemon.types[0].type.name).light,
            borderRadius: 10
        }
    }

    getAPIDetails = async () => {
        const indexOfPokemon = this.props.pokemon.map(pokemon => pokemon.name).indexOf(this.props.name)
        const pokemon = this.props.pokemon[indexOfPokemon]

        const fetched_pokemon = await PokeAPI.getPokemon(pokemon.id)
        const species = await PokeAPI.get(fetched_pokemon.species.url)

        this.setState({ 
            fetching: false, 
            pokemon: { 
                ...fetched_pokemon, 
                description: species.flavor_text_entries.filter(fte => fte.language.name === 'en')[0].flavor_text
            }
        }, this.setStyles)
    }

    componentDidMount() {
        const indexOfPokemon = this.props.pokemon.map(pokemon => pokemon.name).indexOf(this.props.name)
        const pokemon = this.props.pokemon[indexOfPokemon]

        this.setState({ pokemon, fetching: true }, this.getAPIDetails)
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

    _GifCard = () => {
        const { pokemon } = this.state;

        return (
            <>
                {/* name */}
                <p className='details-pokemon-name'>{pokemon.name}</p>   

                {/* sprites */}
                <div id='details-sprites' style={{
                    background: pokemon.types.length > 1 
                        ? `linear-gradient(${getTypeColor(pokemon.types[0].type.name).light}, ${getTypeColor(pokemon.types[1].type.name).light})`
                        : getTypeColor(pokemon.types[0].type.name).light 
                }}>
                    {
                        // Gifs Only Available for Pokemon up to X/Y
                        pokemon.id < 720
                            ? <PokeSprite pokemon={ pokemon.id } />
                            : <img src={ pokemon.sprites.front_default } />
                    }
                   
                </div>

                {/* types */}
                <div className='details-types'>
                    { pokemon.types.map((type, i) => 
                        <p key={i} className='details-type' style={{ 
                            backgroundColor: getTypeColor(pokemon.types[i].type.name).light,
                            color: getTypeColor(pokemon.types[i].type.name).dark 
                        }}>{ type.type.name.toUpperCase() }</p>
                    )}
                </div>
             </>
        )
    }

    showFullAbility = async ability => {
        const apiAbility = await PokeAPI.get(ability.ability.url)

        this.setState({ 
            shownAbility: apiAbility
        })
    }

    _FullAbility = () => {
        console.log(this.state.shownAbility)
        return (
            <div>
                <p>{ this.state.shownAbility.name.split('-').join(' ') }</p>
                <p>{ this.state.shownAbility.flavor_text_entries.filter(entry => entry.language.name === 'en')[0].flavor_text }</p>

                <button     onClick={ closeAbility } />
            </div>
        )
    }

    _FullPokemon = () => {
        const { pokemon } = this.state;

        // Top - Section ( Name, Sprites, Types)
        const _overview = () => {
            return (
                <div className='section details-overview'>

                    <PokemonCard pokemon={ pokemon } style={{ maxWidth: '50%', margin: 'auto', marginBottom: 20 }}/>
                    { this._GifCard() }
                    
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
                { this.state.shownAbility 
                    ? this._FullAbility()
                    : _overview() 
                }

                <div className='section details-content'>
                    {/* description */}
                    <div className='details-description'>
                        <p>{ pokemon.description }</p> 
                    </div>

                    <div className="details-abilities">
                        <p className="details-abilities-text">abilities</p>
                        { pokemon.abilities.map((ability, i) => {
                            return (
                                <div className={`details-ability ${ability.is_hidden && 'details-ability-hidden'}`} key={i} onClick={ () => this.showFullAbility(ability) }>
                                    {ability.is_hidden && <Icon className='details-ability-hidden-icon'>search</Icon>}
                                    <p className='details-ability-name'>{ ability.ability.name }</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="base-stats">
                        <div className="stat-toggles">
                            <button className="toggle">Base Stats</button>
                            <button className="toggle">Min</button>
                            <button className="toggle">Max</button>
                        </div>
                    </div>

                    <div className="evolution-chain">
                        <p>evolution chain</p>
                    </div>
                    {/* moves */}
                        {/* group by game / learn method */}

                        {/* Learned By */}
                            {/* [ Level Up ] , [ Egg ], [ Disc ], [ Tutor ] */}
                            {/* ^^^^ these are buttons that change the page of moves being shown; not filters; just component toggles */}

                        {/* Filter By */}
                            {/* Select Game */}
                            {/* Select Gen */}
                            {/* selecting these should filter the move set to only those obtainable */}
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
