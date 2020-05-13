import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { catchPokemon, releasePokemon } from '../store/actions/profile'
import './css/Pokeball.css'

function Pokeball(props) {
    const [caught, setCaught] = useState(false)
    const image = 'https://i.imgur.com/EHghstP.png'

    useEffect(() => {
        let isCaught = props.caughtPokemon
            .map(p => p.id)
            .includes(props.pokemon.id)

        setCaught(isCaught)
    }, [props.caughtPokemon, props.pokemon])

    function toggleCatchStatus(event) {
        event.preventDefault()
        !caught
            ? props.catchPokemon(props.pokemon)
            :  props.releasePokemon(props.pokemon)
    }

    return (
        <div onClick={toggleCatchStatus} className={`Pokeball_container ${!caught ? 'Pokeball_inactive' : ''}`}>
            <img  src={image} className='Pokeball_icon' alt={`This pokemon has ${caught ? 'already' : 'not'} been caught.`}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        caughtPokemon: state.profile.caughtPokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        catchPokemon: pokemon => {
            dispatch(catchPokemon(pokemon))
        },
        releasePokemon: pokemon => {
            dispatch(releasePokemon(pokemon))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokeball)
