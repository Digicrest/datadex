import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'

import { Container, Card } from '@material-ui/core'

import './css/PokemonCard.css'

class PokemonCard extends Component {
    constructor(props) {
        super(props)

        const pokemon = props.pokemon
        this.state = {
            backgroundColor: pokemon.types.length > 1 
                ? `linear-gradient(${getTypeColor(pokemon.types[0].type.name).color}, ${getTypeColor(pokemon.types[1].type.name).color});`
                : getTypeColor(pokemon.types[0].type.name)
        }
    }

    render() {
        const pokemon = this.props.pokemon
        
        return (
            <Link id={`${pokemon.name}-card`} to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }} >
               
                <Card className='pokemon-card' style={{ backgroundColor: this.state.backgroundColor }}>
                    <div className='highlight'></div>
                    <Container className='left'>
                        <div className='id-name-container'>
                            <p className='pokemon-id'>#{ pokemon.id.toString().padStart(3, 0) }</p>
                            <p className='pokemon-name'>{ pokemon.name }</p>
                        </div>

                        <div className='types'>
                            { pokemon.types.map((type, i) => 
                                <p key={i} className='type'>{ type.type.name.toUpperCase() }</p>
                            )}
                        </div>
                    </Container>

                    <div className='right'>
                        <img src={ pokemon.sprite } alt={ pokemon.name } className='pokemon-image' />
                    </div>
                </Card>
            </Link>
        )
    }
}

export default PokemonCard

