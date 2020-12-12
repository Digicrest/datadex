import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { Checkbox, FormControlLabel, makeStyles, GridList, GridListTile, Grid } from '@material-ui/core'
import ProgressBar from '../components/ProgressBar'

function Home({ pokemon, caughtPokemon }) {
    const classes = useStyles()
    const [displayedPokemon, setDisplayedPokemon] = useState(pokemon)
    const [searchTerm, setSearchTerm] = useState('')
    const [onlyShowCapturedPokemon, setOnlyShowCapturedPokemon] = useState(false)
    const [caughtMap, setCaughtMap] = useState({})
    
    useEffect(() => {
        let caughtPokemonIDs = [];

        if (onlyShowCapturedPokemon) {
            caughtPokemonIDs = caughtPokemon.map(pokemon => pokemon.id)
        }

        let filtered = pokemon
            .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(pokemon => !onlyShowCapturedPokemon || caughtPokemonIDs.includes(pokemon.id))
            
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
        pokemon: state.database.pokemon,
        caughtPokemon: state.profile.caughtPokemon,
    }
}

export default connect(mapStateToProps)(Home)


const useStyles = makeStyles({
    filters: {
        margin: 20
    }
})