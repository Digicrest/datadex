import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { catchPokemon, releasePokemon } from '../store/actions/profile'

function Pokeball({ isCaught, pokemon, catchPokemon, releasePokemon }) {
    const classes = useStyles()
    const image = 'https://i.imgur.com/EHghstP.png'

    const toggleCatchStatus = e => {
        e.preventDefault()

        isCaught 
            ? releasePokemon(pokemon)
            : catchPokemon(pokemon)
    }

    const showCatchStatus = () => {
        isCaught 
            ? console.log(`[Pokeball] ${pokemon.name} is Caught!`)
            : console.log(`[Pokeball] ${pokemon.name} is Wild!`)
    }

    return (
        <div onClick={toggleCatchStatus} onMouseEnter={showCatchStatus} className={classes.root} style={{ opacity: isCaught ?  .9 : .3 }}>
            <img 
                src={image} 
                className={classes.icon} 
                alt={`This pokemon has ${isCaught ? 'already' : 'not'} been caught.`}
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        catchPokemon: pokemon => dispatch(catchPokemon(pokemon)),
        releasePokemon: pokemon => dispatch(releasePokemon(pokemon))
    }
}

export default connect(null, mapDispatchToProps)(Pokeball)

const useStyles = makeStyles({
    root: {
        width: 25,
        height: 25,
        borderRadius: '50%',
    },
    icon: {
        width: '100%',
        height: '100%',
        '&:hover': {
            animation: 'spin 250ms'
        }
    },
    "@keyframes spin": {
        "0%": {
            transform: `rotate('0deg')`
        },
        "100%": {
            transform: `rotate('360deg')`
        }
    }
})