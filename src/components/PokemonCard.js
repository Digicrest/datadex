import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getTypeColor } from '../apis/pokemon/PokeHelpers'

import { Container, Card } from '@material-ui/core'

class PokemonCard extends Component {
    render() {
        const pokemon = this.props.pokemon
        const pokemon_style = { ...styles.pokemon_card, backgroundColor: getTypeColor(pokemon.types) }
        
        return (
            <Link to={`/pokemon/:${pokemon.name}`} style={{ textDecoration: 'none' }}>
                <Card style={pokemon_style} >
                    <Container style={styles.left}>
                        <div style={styles.id_name_container}>
                            <p style={styles.pokemon_id}>#{ pokemon.id.toString().padStart(3, 0) }</p>
                            <p style={styles.pokemon_name}>{ pokemon.name }</p>
                        </div>

                        <div style={ styles.types }>
                            { pokemon.types.map((type, i) => 
                                <p key={i} style={ styles.type }>{ type.type.name.toUpperCase() }</p>
                            )}
                        </div>
                    </Container>

                    <div style={styles.right}>
                        <img src={ pokemon.sprites.front_default } alt={ pokemon.name } style={styles.pokemon_image} />
                    </div>
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
        borderRadius: '5px',
        
        display: 'flex',
        flexDirection: 'row',
        margin: '5px'
    },
    
    id_name_container: { 
        display: 'flex',
        alignItems: 'center'
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
        border: '1px solid #00000020',
        borderRadius: '10px',
        padding: '5px',
        marginRight: '10px',
        backgroundColor: '#FFFFFF50'
    },

    left: { 
        width: '70%',
    },

    right: { 
        width: '30%',
        borderTopLeftRadius:' 50%',
        borderBottomLeftRadius: '50%',
        backgroundColor: '#FFFFFF95',
        // borderLeft: '2px solid #00000080',
    },

    pokemon_image: {
        // opacity: 0.7
    }
}



