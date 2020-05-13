import React from 'react'
import './css/Sprite.css'

// const images = {
//     loading: require('../../resources/images/pokemon-silhouette.png') ,
//     failedToLoad: require('../../resources/images/fainted-pokemon.png')
// }

function Sprite(props) {
    // const [loaded, setLoaded] = useState(false)
    const uri =props.pokemon.hasOwnProperty('sprites')
        ?  props.pokemon.sprites.front_default
        :   props.pokemon.sprite

    return (
        <div className='sprite'>
            <div className='imageContainer'>
                <img 
                    alt={props.pokemon.name} 
                    className='image'
                    src={uri}
                    // src={loaded ? uri : images.loading}
                    // onLoadStart={() => setLoaded(false)}
                    // onLoad={() => setLoaded(true)}
                    // style={{ opacity: loaded ? 1 : 0.3 }}
                />
            </div>
        </div>
    )
}

export default Sprite
