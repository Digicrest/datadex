import React, { Component } from 'react'
import { connect } from 'react-redux'

import GridList from '../components/GridList'
import PokemonCard from '../containers/Card'

export class Home extends Component {
    render() {
        return (
            <GridList 
                data={this.props.pokemon}
                renderItem={pokemon => (
                    <PokemonCard pokemon={pokemon} />
                )}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon,
        search_term: state.config.search_term
    }
}

export default connect(mapStateToProps)(Home)