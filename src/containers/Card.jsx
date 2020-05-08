import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getTypeColor } from '../apis/pokemon/PokeHelpers'

import Sprite from '../components/Pokemon/Sprite'
import Type from '../components/Pokemon/Type'
import Tag from '../components/Pokemon/Tag'

import './css/Card.css'
export class PokemonCard extends Component {
    getBackgroundColor(pokemonTypes) {
        if (pokemonTypes.length > 1) {
            return `linear-gradient(
                ${getTypeColor(pokemonTypes[0].type.name).color}, 
                ${getTypeColor(pokemonTypes[1].type.name).color}
            )`
        }

       return getTypeColor(pokemonTypes[0].type.name).color
    }

    render() {
        const pokemon = this.props.pokemon

        let backgroundColor = this.getBackgroundColor(pokemon.types) 

        return (
            <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }}>
                <div className='card' style={{background: backgroundColor}}>
                    <div className='shine'></div>

                    <div style={{ flex: 2 }}>
                        <Tag id={pokemon.id} name={pokemon.name} type={pokemon.types[0].type.name} />
                        
                        <div className='Card_types'>
                            {pokemon.types.map((type, i) => 
                                <Type key={i} type={type} />
                            )}
                        </div>
                    </div>

                    <Sprite pokemon={pokemon} />
                </div>
            </Link>
        )
    }
}

export default PokemonCard