import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { Checkbox, FormControlLabel, makeStyles, GridList, GridListTile, Grid } from '@material-ui/core'
import ProgressBar from '../components/ProgressBar'

const Pokedex = require('pokeapi-js-wrapper')
const POKEDEX = new Pokedex.Pokedex()

function Home({ caughtPokemon }) {
    const classes = useStyles()
    const [pokemon, setPokemon] = useState([])
    const [displayedPokemon, setDisplayedPokemon] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [onlyShowCapturedPokemon, setOnlyShowCapturedPokemon] = useState(false)
    const [caughtMap, setCaughtMap] = useState({})
    
    useEffect(() => {
        POKEDEX.getPokemonsList().then(response => {


            const pokemonPromises = response.results.slice(0, 20).map(p => {
                return POKEDEX.getPokemonByName(p.name)
            })
            Promise.all(pokemonPromises).then(pokemosn => {
                setPokemon(pokemosn)
                setDisplayedPokemon(pokemosn)
            })

            // setPokemon(response.results.slice(0, 151))
            // setDisplayedPokemon(response.results.slice(0, 151))
        })
    }, [])

    useEffect(() => {
        let caughtPokemonNames = [];

        if (onlyShowCapturedPokemon) {
            caughtPokemonNames = caughtPokemon.map(pokemon => pokemon.name)
        }

        let filtered = pokemon
            .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(pokemon => !onlyShowCapturedPokemon || caughtPokemonNames.includes(pokemon.name))
            
        setDisplayedPokemon(filtered)
    }, [searchTerm, pokemon, caughtPokemon, onlyShowCapturedPokemon])
    
    useEffect(() => {
        setCaughtMap(caughtPokemon.reduce((map, p) => {
            map[p.name] = p
            return map
        }, {}))
    }, [caughtPokemon])

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <ProgressBar 
                emptyColor={'#EEE'}
                count={caughtPokemon.length}
                maxCount={pokemon.length}
                label={'PokeDex Completion'}
            />

            <div className={classes.filters}>
                <SearchBar onChange={setSearchTerm} />

                <FormControlLabel label='Only Caught' style={{ marginTop: 10 }} control={(
                    <Checkbox checked={onlyShowCapturedPokemon} onClick={() => setOnlyShowCapturedPokemon(!onlyShowCapturedPokemon)} />
                )} />
            </div>


            <LazyLoad height={200} once>
                <GridList 
                    cellHeight='auto'
                    style={{ padding: 10, maxHeight: '70vh' }}
                    spacing={5}
                >
                    { displayedPokemon.map(pokemon => (
                        <GridListTile style={{ flex: 1, minWidth: 400 }}>
                            <PokemonCard pokemon={pokemon} isCaught={caughtMap[pokemon.name] !== undefined} />
                        </GridListTile>
                    ))}
                </GridList>
            </LazyLoad>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        caughtPokemon: state.profile.caughtPokemon,
    }
}

export default connect(mapStateToProps)(Home)


const useStyles = makeStyles({
    filters: {
        margin: 20
    }
})