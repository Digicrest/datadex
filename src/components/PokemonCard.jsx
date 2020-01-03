import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'
import { Container, Card } from '@material-ui/core'

import './css/PokemonCard.css'
function PokemonCard(props) {
    const pokemon = props.pokemon

    const [background] = useState(pokemon.types.length > 1 
        ? `linear-gradient(${getTypeColor(pokemon.types[0].type.name).color}, ${getTypeColor(pokemon.types[1].type.name).color})`
        : getTypeColor(pokemon.types[0].type.name).color)
        
    return (
        <Link id={`${pokemon.name}-card`} to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }} >
            
            <Card className='pokemon-card' style={{ background: background,  ...props.style }}>
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
                    <img src={ pokemon.sprite || pokemon.sprites.front_default } alt={ pokemon.name } className='pokemon-image' />
                </div>
            </Card>
        </Link>
    )
}

export default PokemonCard

