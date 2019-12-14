import React, { Component } from 'react'
import cloneDeep from 'lodash.clonedeep'
import { connect } from 'react-redux'
import { Container, Card, Typography, Icon, Slider } from '@material-ui/core'
import PokeSprite from 'react-poke-sprites'

import PokeAPI from '../apis/pokemon/PokeAPI'
import { getTypeColor, getStatColor } from '../apis/pokemon/PokeHelpers'

import PokemonCard from './PokemonCard.jsx'

import ProgressBar from './ProgressBar.jsx'
import Loader from './Loader.jsx'


import './css/PokemonDetails.css'


// TODO: Pass in growth-rate switch on it to the relevant formula and return each base stat ran through calc
const something = () => {
    // 1. slow = \frac{5x^3}{4}
    // 2. medium = x^3
    // 3. fast = \frac{4x^3}{5}
    // 4. medium-slow = \frac{6x^3}{5} - 15x^2 + 100x - 140
    // 5. slow-then-very-fast = 
    //     "\begin{cases}
    // \frac{ x^3 \left( 100 - x \right) }{50},    & \text{if } x \leq 50  \\
    // \frac{ x^3 \left( 150 - x \right) }{100},   & \text{if } 50 < x \leq 68  \\
    // \frac{ x^3 \left( 1274 + (x \bmod 3)^2 - 9 (x \bmod 3) - 20 \left\lfloor \frac{x}{3} \right\rfloor \right) }{1000}, & \text{if } 68 < x \leq 98  \\
    // \frac{ x^3 \left( 160 - x \right) }{100},   & \text{if } x > 98  \\
    // \end{cases}"
}






class PokemonDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemon: null,
            gif: null,
            
            fetching: false,
            haveAPIDetails: false,
            species: null,
            growth: null,
            fetchedAbilities: [],
            
            shownAbility: null,
            showStatBars: false
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
        const growth = await PokeAPI.get(species.growth_rate.url)
        const evolution = await PokeAPI.get(species.evolution_chain.url)

        console.log('Pokemon: ', pokemon)
        console.log('fetched_pokemon: ', fetched_pokemon)
        console.log('species: ', species)
        console.log('evolution: ', evolution)
        console.log('growth: ', growth)

        this.setState({ 
            fetching: false, 
            pokemon: { 
                ...fetched_pokemon,
                description: species.flavor_text_entries.filter(fte => fte.language.name === 'en')[0].flavor_text 
            },
            species,
            evolution,
            growth,
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


    _EvolutionChain = () => {
        console.log('_EvolutionChain: ', this.state.evolution)
        return (
            <div className="evolution-chain">
                <p>Evolution Chain Here</p>
                {/* <p>{this.state.pokemon.name} -> {this.state.evolution.chain.evolves_to[0].species.name}</p> */}
            </div>
        )
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
                    
                    <div style={{ display: 'flex' }}>
                        { !this.state.showStatBars 
                            ? <Icon style={{ marginRight: 30 }} onClick={() => this.setState({ showStatBars: true })}>view_list</Icon>
                            : <Icon style={{ marginRight: 30 }} onClick={() => this.setState({ showStatBars: false })}>short_text</Icon>
                        }

                        <Slider 
                            min={1} 
                            max={100} 
                            step={1}
                            onChange={(val) => console.log(val)}
                            className='details-level-slider'
                            style={{ color: colors[0].color }}
                            defaultValue={1}
                            valueLabelDisplay="auto"
                        />
                    </div>

                    {/* stats */}
                    { this.state.showStatBars && 
                        <div className='details-stats-bars'>
                            { pokemon.stats.map((stat, i) => { 
                                return ( 
                                    <ProgressBar key={ i }
                                        containerWidth={50}
                                        // containerHeight={200}
                                        count={stat.base_stat}
                                        maxCount={255}
                                        fillColor={getStatColor(stat.stat.name).color}
                                        finishColor={colors[0].color}
                                        emptyColor={getStatColor(stat.stat.name).dark}
                                        label={stat.stat.name.split('-').join(' ')}
                                    />
                                )
                            })}
                        </div>
                    }

                    { !this.state.showStatBars && 
                        <div className='details-stats-text'>
                            { pokemon.stats.map((stat, i) => {
                                return (
                                    <div className='details-stat' key={i}>
                                        <p>{ stat.stat.name.split('-').join(' ') }</p>
                                        <p style={{ fontWeight: 'bold' }}>{ stat.base_stat }</p>
                                    </div>
                                )
                            })}
                        </div>
                    }

                   
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

                   
                    {/* moves */}
                        {/* group by game / learn method */}

                        {/* Learned By */}
                            {/* [ Level Up ] , [ Egg ], [ Disc ], [ Tutor ] */}
                            {/* ^^^^ these are buttons that change the page of moves being shown; not filters; just component toggles */}

                        {/* Filter By */}
                            {/* Select Game */}
                            {/* Select Gen */}
                            {/* selecting these should filter the move set to only those obtainable */}

                    {/* Evolution Line */}
                    { this.state.evolution && this._EvolutionChain() }

                    {/* Damage Chart */}
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
                    { !this.state.haveAPIDetails && this.state.fetching
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
