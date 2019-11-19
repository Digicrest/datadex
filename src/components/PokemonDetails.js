import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Typography } from '@material-ui/core'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'
import Loader from '../components/Loader'

import './css/PokemonDetails.css'

class PokemonDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemon: null
        }
    }


    componentDidMount() {
        const indexOfPokemon = this.props.pokemon.map(pokemon => pokemon.name).indexOf(this.props.name)
        this.setState({ pokemon: this.props.pokemon[indexOfPokemon] })
    }

    _PokemonDetails = () => {
        const { pokemon } = this.state

        return (
            <Container id='pokemon-details' style={{ backgroundColor: getTypeColor(pokemon.types) }}>
                <Typography>{ pokemon.name }</Typography>
                <Typography>{ JSON.stringify(pokemon, 0, 2) }</Typography>
            </Container>
        )
    }

    render() {
        return !this.state.pokemon 
            ? <Loader />
            : this._PokemonDetails()
    }
}


const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon
    }
}

export default connect(mapStateToProps)(PokemonDetails)
