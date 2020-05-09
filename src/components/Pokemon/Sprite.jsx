import React from 'react'
import './css/Sprite.css'

function Sprite(props) {
    const {pokemon} = props
    const uri = pokemon.hasOwnProperty('sprites')
        ? pokemon.sprites.front_default
        :  pokemon.sprite

    return (
        <div className='sprite'>
            <div className='imageContainer'>
                <img src={uri} alt={pokemon.name} className='image' placeholder='image' />
            </div>
        </div>
    )
}

export default Sprite
