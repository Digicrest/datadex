import React from 'react'
import { makeStyles } from '@material-ui/core'

// const images = {
//     loading: require('../../resources/images/pokemon-silhouette.png') ,
//     failedToLoad: require('../../resources/images/fainted-pokemon.png')
// }

export default function Sprite({ pokemon }) {
    const classes = useStyles()

    // const [loaded, setLoaded] = useState(false)
    const uri = pokemon.hasOwnProperty('sprites')
        ? pokemon.sprites.front_default
        : pokemon.sprite

    return (
        <div className={`${classes.sprite} sprite`}>
            <div className={classes.imageContainer}>
                <img 
                    alt={pokemon.name} 
                    className={classes.image}
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

const useStyles = makeStyles({
    sprite: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: '50%',
        backgroundColor: '#00000030',
        boxShadow: '1px 2px 4px #00000050',
        padding: 5,
        maxWidth: '60%',
        maxHeight: '100%'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})