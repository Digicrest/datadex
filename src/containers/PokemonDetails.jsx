import React from 'react'


import './css/PokemonDetails.css'
function PokemonDetails(props) {
    console.log('[PokemonDetails] props: ', props)
    const {pokemon} = props

    return (
        <div>
            <h1>Details</h1>

            {pokemon.abilities.map((ability, i) => {
                return (
                    <div key={i} className={`details-ability ${ability.is_hidden && 'details-ability-hidden'}`}>
                        <h3 className='details-ability-name'>{ability.ability.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default PokemonDetails
