import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PokeAPI from '../apis/pokemon/PokeAPI'

class Home extends Component {
    getPokemon = async () => {
        const pikachu = await PokeAPI.getPokemon('')
        console.log('got: ', pikachu)
    }

    render() {
        return (
            <div id='app'>
                Home 

                <Link to='/About'>
                    <p>About</p>
                </Link>

                <button onClick={ this.getPokemon }>Fetch</button>
              
            </div>
        )
    }
}

export default Home
