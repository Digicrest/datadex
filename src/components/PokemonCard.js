import React, { Component } from 'react'
import { Container, Card, Typography, Avatar } from '@material-ui/core';


const getTypeColor = types => {
    const type = types.length > 1 ? types[1].type.name : types[0].type.name

    switch(type) {
        case 'electric': 
            return '#FFEE3380';

        case 'fire': 
            return '#FF000080';

        case 'grass':
            return '#00FF0080';

        case 'poison':
            return '#FF00FF80';

        default: 
            return '#000'
    }
}

class PokemonCard extends Component {
    componentDidMount() {
        console.log(this.props.pokemon)
    }

    render() {
        const pokemon = this.props.pokemon
        
        const pokemon_style = { ...styles.pokemon_card, backgroundColor: getTypeColor(pokemon.types) }
        return (
            <Card style={pokemon_style}>
                <Container style={styles.left}>
                    <div style={styles.id_name_container}>
                        <Typography variant='h5' style={styles.pokemon_id}>#{ pokemon.id.toString().padStart(3, 0) }</Typography>
                        <Typography variant='h5' style={styles.pokemon_name}>{ pokemon.name }</Typography>
                    </div>

                    <div style={ styles.types }>
                        { pokemon.types.map(type => {
                            console.log('type:: ', type)
                            return (
                                <Typography style={ styles.type }>{ type.type.name.toUpperCase() }</Typography>
                          
                            )
                        })}
                    </div>
                </Container>

                <Container style={styles.right}>
                    <img src={ pokemon.sprites.front_default } alt={ pokemon.name } style={styles.pokemon_image} />
                </Container>
            </Card>
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
        flexDirection: 'row'
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