import React from 'react'
import './css/Sprite.css'

function Sprite(props) {
    const {pokemon} = props

    return (
        <div className='sprite'>
            <div className='imageContainer'>
                <img src={pokemon.sprite} alt={pokemon.name} className='image' />
            </div>
        </div>
    )
}

export default Sprite
