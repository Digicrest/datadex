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

    getPokemon = async () => {
        const pikachu = await PokeAPI.getPokemon('pikachu')
        console.log(pikachu)
        this.setState({ search_result: JSON.stringify(pikachu) })
    }
             
    render() {
        return (
            <div>
                <p>About</p>

                <Link to='/Home'>
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
