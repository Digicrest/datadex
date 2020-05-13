import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import GridList from '../components/GridList'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../containers/PokemonCard'
import { Checkbox, InputLabel } from '@material-ui/core'

import './css/Home.css'
function Home(props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [onlyCaught, setOnlyCaught] = useState(false)
    const [listData, setListData] = useState(props.pokemon)

    useEffect(() => {
        let caughtPokemonIDs = [];

        if (onlyCaught) {
            caughtPokemonIDs = props.caughtPokemon.map(pokemon => pokemon.id)
        }

        let filtered = props.pokemon
            .filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).filter(pokemon => {
                if (onlyCaught) {
                    return caughtPokemonIDs.includes(pokemon.id)
                }
                return true
            })
            
        setListData(filtered)
    }, [searchTerm, props.pokemon, props.caughtPokemon, onlyCaught])

    return (<>
        <div className='Home_filters'>
            <SearchBar onChange={setSearchTerm} />
            <div>
                Only Caught
                <Checkbox checked={onlyCaught} onClick={() => setOnlyCaught(!onlyCaught)} />
            </div>
        </div>

        <GridList 
            data={listData}
            renderItem={pokemon => (
                <PokemonCard pokemon={pokemon} />
            )}
        />
    </>)
}

const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon,
        caughtPokemon: state.profile.caughtPokemon,
        searchName: state.config.searchName
    }
}

export default connect(mapStateToProps)(Home)