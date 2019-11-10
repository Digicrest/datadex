import React, { Component } from 'react'
import { Card } from '@material-ui/core';

import './css/PokemonCard.css';

class PokemonCard extends Component {
    render() {
        return (
            <Card className='pokemon-card'>
                Pokemon Card    
            </Card>
        )
    }
}

export default PokemonCard
