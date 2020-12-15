import React, { useState, useEffect, Fragment } from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core'
import LoadingSpinner from '../components/LoadingSpinner'
import { RemoveRedEye, InfoOutlined } from '@material-ui/icons'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

export default function PokemonAbilities({ pokemon, colors }) {
  const classes = useStyles();
  const [abilities, setAbilities] = useState([])
  const [hiddenAbilities, setHiddenAbilities] = useState([])

  useEffect(() => {
    console.log('pokemon: ', pokemon)
    setAbilities(pokemon.abilities.filter(ability => !ability.is_hidden))
    setHiddenAbilities(pokemon.abilities.filter(ability => ability.is_hidden))
  }, [pokemon])

  useEffect(() => {
    console.log('colors: ', colors)
  }, [colors])
  
  function renderAbility(ability, i) {
    return (
      <Fragment>  
        {!!(i > 0) && (
          <Typography>or</Typography>
        )}
        <div className={classes.ability} style={{
          backgroundColor: ability.is_hidden ? colors.light : colors.dark, 
          color: ability.is_hidden ? colors.dark : colors.light
        }}>
          <div style={{ position: 'absolute', left: 10 }}>
            { ability.is_hidden 
              ? <RemoveRedEye />
              : <InfoOutlined />
            }
          </div>
          <Typography>
            { ability.ability.name
              .split('-')
              .map(p => p.substr(0, 1).toUpperCase() + p.substr(1))
              .join(' ')
            }
          </Typography>
        </div>
      </Fragment>
    )
  }

  return (
    <Card className={classes.root}>
      <div className={classes.abilities}>
        {abilities.map((ability, i) => 
          renderAbility(ability, i)
        )}
      </div>

      <div className={classes.abilities}>
        {hiddenAbilities.map((ability, i) => 
          renderAbility(ability, i)
        )}
      </div>
    </Card>
  )
}


const useStyles = makeStyles({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '30vw',
    minWidth: 350,
    margin: 5,
    padding: 10,
    borderRadius: 10
  },
  title: {
    fontFamily: 'sans'
  },
  abilities: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  ability: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    padding: 5, 
    borderRadius: 10,
    textAlign: 'center',
    margin: 5,

    boxShadow: '2px 2px 4px #00000030'
  }
})