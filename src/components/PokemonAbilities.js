import React, { useState, useEffect, Fragment } from 'react'
import { Card, Collapse, makeStyles, Typography } from '@material-ui/core'
import LoadingSpinner from '../components/LoadingSpinner'
import { RemoveRedEye, InfoOutlined } from '@material-ui/icons'
import PokemonCard from './PokemonCard'
import { connect } from 'react-redux'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

function PokemonAbilities(props) {
  const { pokemon, colors } = props;
  const classes = useStyles();
  const [abilities, setAbilities] = useState([])
  const [hiddenAbilities, setHiddenAbilities] = useState([])
  const [expandedAbility, setExpandedAbility] = useState(null)
  const [showPokemonWithSkill, setShowPokemonWithSkill] = useState(false)

  useEffect(() => {
    console.log('pokemon: ', pokemon)
    setAbilities(pokemon.abilities.filter(ability => !ability.is_hidden))
    setHiddenAbilities(pokemon.abilities.filter(ability => ability.is_hidden))
  }, [pokemon])

  useEffect(() => {
    console.log('colors: ', colors)
  }, [colors])
  
  useEffect(() => {
    console.log('expandedAbility: ', expandedAbility)
  }, [expandedAbility])

  function viewAbility(ability) {
    console.log('prefetch: ', ability)
    POKEDEX.getAbilityByName(ability.ability.name).then(response => {
      setExpandedAbility(response)
    })
  }

  function renderAbility(ability, i) {
    return (
      <Fragment>  
        {!!(i > 0) && (
          <Typography>or</Typography>
        )}
        <div
          onClick={() => viewAbility(ability)}
          className={classes.ability} 
          style={{
            backgroundColor: ability.is_hidden ? colors.light : colors.dark, 
            color: ability.is_hidden ? colors.dark : colors.light
          }}
        >
          <div style={{ position: 'absolute', left: 5 }}>
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

      {!!expandedAbility && (
        <div>
          <p>{expandedAbility.name}</p>
          <p onClick={() => setShowPokemonWithSkill(!showPokemonWithSkill)}>
            Other Pokemon with this skill
          </p>
          <Collapse in={showPokemonWithSkill}>
            {expandedAbility.pokemon.filter(p => p.is_hidden).map(p => {

              return (
                <PokemonCard pokemon={p.pokemon.name} isCaught={props.caughtPokemon.map(p => p.name).includes(p.pokemon.name)} />
              )
            })}
          </Collapse>
        </div>
      )}
    </Card>
  )
}

const mapStateToProps = state => {
  return {
      caughtPokemon: state.profile.caughtPokemon,
  }
}

export default connect(mapStateToProps)(PokemonAbilities)


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