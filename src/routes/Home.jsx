import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import GridList from '../components/GridList'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../containers/PokemonCard'

function Home(props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [listData, setListData] = useState(props.pokemon)

    useEffect(() => {
        const filtered = props.pokemon.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setListData(filtered)
    }, [searchTerm, props.pokemon])

    return (<>
        <SearchBar onChange={setSearchTerm} />
        {/* <SearchBar /> */}
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
        searchName: state.config.searchName
    }
}

export default connect(mapStateToProps)(Home)