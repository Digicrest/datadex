import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Typography } from '@material-ui/core'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'

class PokemonDetails extends Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <Container>
                <Typography>{ this.props.name }</Typography>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        pokemon: state.database.pokemon
    }
}

export default connect(mapStateToProps)(PokemonDetails)
