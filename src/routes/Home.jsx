import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { Checkbox, FormControlLabel, makeStyles, GridList, GridListTile } from '@material-ui/core'
import ProgressBar from '../components/ProgressBar'
import theme from '../theme'

function Home({ pokemon, caughtPokemon }) {
    const classes = useStyles()
    const [displayedPokemon, setDisplayedPokemon] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [onlyShowCapturedPokemon, setOnlyShowCapturedPokemon] = useState(false)
    const [caughtMap, setCaughtMap] = useState({})

    useEffect(() => {
        setDisplayedPokemon(pokemon)
    }, [])

    useEffect(() => {
        let filtered = pokemon

        if (searchTerm) {
            filtered = pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        if (onlyShowCapturedPokemon) {
            let caughtPokemonNames = caughtPokemon.map(pokemon => pokemon.name)
            filtered = filtered.filter(pokemon => caughtPokemonNames.includes(pokemon.name))
        }
            
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
                emptyColor={theme.palette.primary.light}
                fillColor={theme.palette.primary.dark}
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

            <GridList 
                cellHeight='auto'
                style={{ padding: 10, maxHeight: '70vh' }}
                spacing={5}
            >
                { displayedPokemon.map(pokemon => (
                    <GridListTile key={pokemon.id} style={{ flex: 1, minWidth: 400 }}>
                        <PokemonCard pokemon={pokemon} isCaught={caughtMap[pokemon.name] !== undefined} />
                    </GridListTile>
                ))}
            </GridList>
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
        display: 'flex',
        flexDirection: 'column',
        margin: 20
    }
})