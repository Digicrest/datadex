import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button, Icon, Typography, TextField } from '@material-ui/core'

import PokeAPI from '../apis/pokemon/PokeAPI'

export class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_result: 'Fetch Result...'
        }
    }
             
    render() {
        return (
            <div>
                <p>About</p>

                <Link to='/'>
                    <p>Home</p>
                </Link>
                <Button variant="contained" color="primary" onClick={ this.getPokemon }>
                   <Icon>link</Icon>
                   <Typography>Fetch</Typography>
                </Button>

                <TextField
                    label="Multiline"
                    multiline
                    rows="4"
                    value={ this.state.search_result }
                    margin="normal"
                    variant="outlined"
                />
            </div>
        )
    }
}

export default About
