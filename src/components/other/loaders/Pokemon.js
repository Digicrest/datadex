import React from 'react'

import './css/Pokemon.css'
// const image = require('../../../resources/images/pokeball.png')
const image = 'https://i.imgur.com/EHghstP.png'
function Loader({ name }) {
    const imageExplanation = 'Charmander running around in circles.'

    return (
        <div className='Loader'>
            <div className='Loader_spinnerContainer'>
                <img
                    className='Loader_spinner' 
                    src={image} 
                    alt={imageExplanation}
                    style={{ width: '100%',  height: '100%'  }}
                />
            </div>
            <h1>A wild {name} appeared!</h1>
        </div>
        
    )
}

export default Loader