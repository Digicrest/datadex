import React from 'react'

export function PokemonLoader() {
    const gif = 'https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif'
    
    return (
        <img src={gif} style={{ width: '100%',  height: '100%' }} />
    )
}

export default PokemonLoader