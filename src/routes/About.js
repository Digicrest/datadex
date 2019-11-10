import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class About extends Component {
    render() {
        return (
            <div>
                <p>About</p>

                <Link to='/Home'>
                    <p>Home</p>
                </Link>
            </div>
        )
    }
}

export default About
