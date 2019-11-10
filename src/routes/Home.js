import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Home extends Component {
    render() {
        return (
            <div id='app'>
                Home 

                <Link to='/About'>
                    <p>About</p>
                </Link>
              
            </div>
        )
    }
}

export default Home
