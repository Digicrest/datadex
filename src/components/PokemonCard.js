import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'

import { Container, Card, Typography } from '@material-ui/core'

class PokemonCard extends Component {
    componentDidMount() {
        console.log(this.props.pokemon)
    }

    render() {
        const pokemon = this.props.pokemon
        const pokemon_style = { ...styles.pokemon_card, backgroundColor: getTypeColor(pokemon.types) }
        
        return (
            <Link to={`/pokemon/:${pokemon.name}`} style={{ textDecoration: 'none' }}>
                <Card style={pokemon_style} >
                    <Container style={styles.left}>
                        <div style={styles.id_name_container}>
                            <Typography variant='h5' style={styles.pokemon_id}>#{ pokemon.id.toString().padStart(3, 0) }</Typography>
                            <Typography variant='h5' style={styles.pokemon_name}>{ pokemon.name }</Typography>
                        </div>

                        <div style={ styles.types }>
                            { pokemon.types.map((type, i) => 
                                <Typography key={i} style={ styles.type }>{ type.type.name.toUpperCase() }</Typography>
                            )}
                        </div>
                    </Container>

                    <Container style={styles.right}>
                        <img src={ pokemon.sprites.front_default } alt={ pokemon.name } style={styles.pokemon_image} />
                    </Container>
                </Card>
            </Link>
        )
    }
}

export default PokemonCard

const styles = {
    pokemon_card: {
        height: '20%',
        minHeight: '100px',
        margin: '10px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'row',
    },

    left: { 
        flex: 3
    },
    
    id_name_container: {
        display: 'flex',

        borderWidth: '1px',
        borderColor: 'red'
    },
    
    pokemon_id: {
        marginRight: '10px' 
    },
    
    pokemon_name: {
        textTransform: 'capitalize'
    },
    
    types: {
        display: 'flex'
    },
    type: {
        fontSize: '10pt',
        border: '2px solid #00000070',
        borderRadius: '10px',
        padding: '5px',
        marginRight: '10px'
    },

    right: { 
        flex: 1,
        borderTopLeftRadius:' 50%',
        borderBottomLeftRadius: '50%',
        backgroundColor: '#FFFFFF95'
    },

    pokemon_image: {
        width: '100%',
        height: '100%'
    }
}



