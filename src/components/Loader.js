import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'

export class Loader extends Component {
    render() {
        return (
            //todo: use local img
            <img src='https://i.pinimg.com/originals/4e/a2/3e/4ea23e6339937b95a8aa5cd08eeb3266.gif' style={ styles.image } />
        )
    }
}

export default Loader

const styles = {
    image: {
        width: '100%',
        height: '100%'
    }
}