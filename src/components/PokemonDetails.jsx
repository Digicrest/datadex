import React, { useState, useEffect } from 'react'
import cloneDeep from 'lodash.clonedeep'
import { connect } from 'react-redux'
import { Container, Card, Icon, Slider } from '@material-ui/core'
import PokeSprite from 'react-poke-sprites'
import PokeAPI from '../apis/pokemon/PokeAPI'
import { getTypeColor, getStatColor } from '../apis/pokemon/PokeHelpers'
import PokemonCard from './PokemonCard.jsx'
import ProgressBar from './ProgressBar.jsx'
import Loader from './Loader.jsx'
import './css/PokemonDetails.css'

function PokemonDetails(props) {
    const [pokemon, setPokemon] = useState({ stats: [] })
    const [level, setLevel] = useState(1)

    const [gif, setGif] = useState(null)

    const [fetching, setFetching] = useState(true)
    const [fetchedAbilities, setFetchedAbilities] = useState([])
    const [evolution, setEvolution] = useState(null)
    const [species, setSpecies] = useState(null)
    const [shownAbility, setShownAbility] = useState(null)
    const [showStatBars, setShowStatBars] = useState(false)
    const [styles, setStyles] = useState({})

    const getAPIDetails = async () => {
        console.log('getAPIDetails')
        const indexOfPokemon = props.pokemon.map(pokemon => pokemon.name).indexOf(props.name)
        const pokemonID = props.pokemon[indexOfPokemon].id

        const fetched_pokemon   = await PokeAPI.getPokemon(pokemonID)
        const species           = await PokeAPI.get(fetched_pokemon.species.url)
        const evolution         = await PokeAPI.get(species.evolution_chain.url)

        fetched_pokemon.description = species.flavor_text_entries.filter(fte => fte.language.name === 'en')[0].flavor_text

        setFetching(false)
        setPokemon(fetched_pokemon)
        setEvolution(evolution)
        setSpecies(species)
    }

    useEffect(() => {
        const indexOfPokemon = props.pokemon.map(pokemon => pokemon.name).indexOf(props.name)
        const pokemon = props.pokemon[indexOfPokemon]
        
        setPokemon(pokemon)
        console.log('pokemon set to: ', pokemon)
        setFetching(true)
        getAPIDetails()
        
        setStyles({
            colors: pokemon.types.length > 1
                ? [getTypeColor(pokemon.types[0].type.name), getTypeColor(pokemon.types[1].type.name)]
                : [getTypeColor(pokemon.types[0].type.name)],
            borderRadius: 10
        })
    }, [])

    const _GifCard = () => {
        console.log('_GIFCard')

        console.log('styles:: ', styles)
        const colors = styles.colors;

        return (
            <>
                {/* name */}
                <p className='details-pokemon-name'>{pokemon.name}</p>

                {/* sprites */}
                <div id='details-sprites' style={{ 
                    background: colors.length > 1 
                    ? `linear-gradient(${colors[0].light}, ${colors[1].light})` 
                    : colors[0].light
                 }}> {
                    // Gifs Only Available for Pokemon up to X/Y
                    pokemon.id < 720
                        ? <PokeSprite pokemon={pokemon.id} />
                        : <img src={pokemon.sprites.front_default} />
                }</div>

                {/* types */}
                <div className='details-types'>
                    {pokemon.types.map((type, i) =>
                        <p key={i} className='details-type' style={{
                            backgroundColor: getTypeColor(pokemon.types[i].type.name).light,
                            color: getTypeColor(pokemon.types[i].type.name).dark
                        }}>{type.type.name.toUpperCase()}</p>
                    )}
                </div>
            </>
        )
    }

    const closeAbility = () => {
        if (fetchedAbilities.filter(fetched_ability => fetched_ability.name === shownAbility.name).length) {
            setShownAbility(null)
        } else {
            setFetchedAbilities([...fetchedAbilities, cloneDeep(shownAbility)])
            setShownAbility(null)
        }
    }

    const showFullAbility = async ability => {
        console.log('showFullAbility()')
        const already_fetched = fetchedAbilities.filter(fetched_ability => fetched_ability.name === ability.ability.name)

        if (already_fetched.length) {
            setShownAbility(already_fetched[0])
        } else {
            const apiAbility = await PokeAPI.get(ability.ability.url)

            setShownAbility(apiAbility)
            setFetchedAbilities([...fetchedAbilities, apiAbility])
        }
    }

    const addToAllStats = (value) => {
        setPokemon({
            ...pokemon,
            stats: pokemon.stats.map(s => {
                s.base_stat += 1;
                return s
            })
        })
    }

    const _FullPokemon = () => {
        console.log('fullpokemon()')
        const colors = styles.colors;

        return (
            <Container>
                <div className='section details-overview'>
                    <PokemonCard pokemon={ pokemon } style={{ maxWidth: '50%', margin: 'auto', marginBottom: 20 }} />
                    {_GifCard()}
        
                    <div className='details-stats'>
                        <div style={{ display: 'flex' }}>
                            {!showStatBars
                                ? <Icon style={{ marginRight: 30 }} onClick={() => setShowStatBars(true)}>view_list</Icon>
                                : <Icon style={{ marginRight: 30 }} onClick={() => setShowStatBars(false)}>short_text</Icon>
                            }

                            <Slider
                                min={1}
                                max={100}
                                step={1}
                                className='details-level-slider'
                                onChange={(evt, val) => setLevel(val)}
                                style={{ color: colors[0].color }}
                                defaultValue={1}
                                valueLabelDisplay="auto"
                            />
                        </div>

                        { showStatBars
                            ? <div className='details-stats-bars'>
                                { pokemon.stats.map((stat, i) =>
                                    <ProgressBar key={i}
                                        containerWidth={50}
                                        count={stat.base_stat + level}
                                        maxCount={255}
                                        fillColor={getStatColor(stat.stat.name).color}
                                        finishColor={colors[0].color}
                                        emptyColor={getStatColor(stat.stat.name).dark}
                                        label={stat.stat.name.split('-').join(' ')}
                                    />
                                )}
                            </div>
                            : <div className='details-stats-text'>
                                { pokemon.stats.map((stat, i) =>
                                    <div className='details-stat' key={i}>
                                        <p>{stat.stat.name.split('-').join(' ')}</p>
                                        <p style={{ fontWeight: 'bold' }}>{stat.base_stat + level}</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
                
                {/* 
                <div className='section details-content'>
                    <div className='details-description'>
                        <p>{ pokemon.description }</p>
                    </div>

                    <div className="details-abilities">
                        <p className="details-abilities-text">abilities</p>
                        { pokemon.abilities.map((ability, i) => {
                            return (
                                <div className={`details-ability ${ability.is_hidden && 'details-ability-hidden'}`} key={i} onClick={() => showFullAbility(ability)}>
                                    { ability.is_hidden && <Icon className='details-ability-hidden-icon'>search</Icon> }
                                    <p className='details-ability-name'>{ability.ability.name}</p>
                                </div>
                            )
                        })}

                        <Card>
                            { shownAbility && <div>
                                <p>{shownAbility.name.split('-').join(' ')}</p>
                                <p>{shownAbility.flavor_text_entries.filter(entry => entry.language.name === 'en')[0].flavor_text}</p>
                            </div> }
                        </Card>
                    </div>
                    <div className="base-stats">
                        <div className="stat-toggles">
                            <button className="toggle">Base Stats</button>
                            <button className="toggle">Min</button>
                            <button className="toggle">Max</button>
                        </div>
                    </div> 
                */}

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
                    {/* <div className="evolution-chain">
                        <p>Evolution Chain Here</p>
                    </div> */}

                    {/* Damage Chart */}
                {/* </div> */}
            </Container>
        )
    }

    return (
        <Container id='details-pokemon' style={{ backgroundColor: styles.colors ? styles.colors[0].light : '#FFF' }}>
            { fetching 
                ? <Loader />
                : _FullPokemon()
            }
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon
    }
}

export default connect(mapStateToProps)(PokemonDetails)




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
