import React from 'react'

import './css/Pokemon.css'
function Loader({ name }) {
    const gif = 'https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif'
    const gifExplanation = 'Charmander running around in circles.'

    return (
        <div className='loader'>
            <img 
                src={gif} 
                alt={gifExplanation}
                style={{ width: '50%',  height: '50%'  }} 
            />
            <h1>A wild {name} appeared!</h1>
        </div>
        
    )
}

export default Loader