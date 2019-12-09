import React, { Component } from 'react'
import cloneDeep from 'lodash.clonedeep'
import { connect } from 'react-redux'
import { Container, Card, Typography, Icon, Slider } from '@material-ui/core'
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


            fetchedAbilities: [],
            shownAbility: null
        }

        this.styles = { }
    }

    setStyles = () => {
        const { pokemon } = this.state

        this.styles = {
            colors: pokemon.types.length > 1 
                ? [getTypeColor(pokemon.types[0].type.name), getTypeColor(pokemon.types[1].type.name)]
                : [getTypeColor(pokemon.types[0].type.name)],
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
        const colors = this.styles.colors;

        return (
            <>
                {/* name */}
                <p className='details-pokemon-name'>{pokemon.name}</p>   

                {/* sprites */}
                <div id='details-sprites' style={{ background: colors.length > 1 ? `linear-gradient(${colors[0].light}, ${colors[1].light})` : colors[0].light  }}> {
                    // Gifs Only Available for Pokemon up to X/Y
                    pokemon.id < 720
                        ? <PokeSprite pokemon={ pokemon.id } />
                        : <img src={ pokemon.sprites.front_default } />
                }</div>

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

    closeAbility = () => {
        if (this.state.fetchedAbilities.filter(fetched_ability => fetched_ability.name === this.state.shownAbility.name).length) {
            this.setState({ shownAbility: null })
        } else {
            this.setState({
                fetchedAbilities: this.state.fetchedAbilities.concat(cloneDeep(this.state.shownAbility)),
                shownAbility: null
            })
        }
    }

    showFullAbility = async ability => {
        const already_fetched = this.state.fetchedAbilities.filter(fetched_ability => fetched_ability.name === ability.ability.name)
        
        if (already_fetched.length) {
            this.setState({ shownAbility: already_fetched[0] })
        } else {
            const apiAbility = await PokeAPI.get(ability.ability.url)
            this.setState({ 
                shownAbility: apiAbility,
                fetchedAbilities: this.state.fetchedAbilities.concat(apiAbility)
            })
        }
    }

    _FullAbility = () => {
        return (
            <div>
                <p>{ this.state.shownAbility.name.split('-').join(' ') }</p>
                <p>{ this.state.shownAbility.flavor_text_entries.filter(entry => entry.language.name === 'en')[0].flavor_text }</p>
            </div>
        )
    }

    _FullPokemon = () => {
        const { pokemon } = this.state;
        const colors = this.styles.colors;
        
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
                        
                    <Slider 
                        min={1} 
                        max={100} 
                        step={1}
                        onChange={(val) => console.log(val)}
                        className='details-level-slider'
                        style={{ color: colors[0].color }}
                    />
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

                        <Card>
                            { this.state.shownAbility && this._FullAbility() }
                        </Card>
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
            ?   <Container id='details-pokemon' style={{ backgroundColor: this.styles.colors ? this.styles.colors[0].light : '#FFF' }}>
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
