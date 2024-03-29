import React, { useState, useEffect, Fragment } from 'react'
import { Card, CircularProgress, Collapse, makeStyles, Typography } from '@material-ui/core'
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
    setAbilities(pokemon.abilities.filter(ability => !ability.is_hidden))
    setHiddenAbilities(pokemon.abilities.filter(ability => ability.is_hidden))
  }, [pokemon])

  // useEffect(() => {
  //   console.log('colors: ', colors)
  // }, [colors])
  
  // useEffect(() => {
  //   console.log('expandedAbility: ', expandedAbility)
  // }, [expandedAbility])

  function viewAbility(ability) {
    POKEDEX.getAbilityByName(ability.ability.name).then(response => {
      setExpandedAbility(response)
    })
  }



  if (!abilities) {
    return (
      <Card className={classes.root} style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='caption' style={{ marginBottom: 10, opacity: 0.5 }}>
          Loading Abilities...
        </Typography>
        <CircularProgress style={{ color: colors.color }} />
      </Card>
    )
  }


  function Abilities({ abilityList }) {
    return abilityList.map((ability, i) => (
      <Fragment key={ability.url + i}>  
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
    ))
  }

  return (
    <Fragment>
      <Card className={classes.root}>
        <div className={classes.abilities}>
          <Abilities abilityList={abilities} />
        </div>

        <div className={classes.abilities}>
          <Abilities abilityList={hiddenAbilities} />
        </div>

      </Card>

      {!!expandedAbility && (
        <div>
          <p>{expandedAbility.name}</p>
          <p onClick={() => setShowPokemonWithSkill(!showPokemonWithSkill)}>
            Other Pokemon with this skill
          </p>
          <Collapse in={showPokemonWithSkill}>
            {expandedAbility.pokemon.map(p => (
              <PokemonCard key={p.pokemon.id} pokemon={p.pokemon.name} isCaught={props.caughtPokemon.map(p => p.name).includes(p.pokemon.name)} />
            ))}
          </Collapse>
        </div>
      )}
    </Fragment>
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
    flex: 1,
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