import { Card, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PokemonMoveCard from './PokemonMoveCard';

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

function PokemonMoves({ filter, moves }) {
  const classes = useStyles();
  const [displayedMoves, setDisplayedMoves] = useState([])
  
  useEffect(() => {
    const filteredMoves = moves.filter(move => 
      move.version_group_details[0].move_learn_method.name === filter
    )

    Promise.all(filteredMoves.map(move => {
      return POKEDEX
        .getMoveByName(move.move.name)
        .then(fetched => ({ ...move, ...fetched }))
    })).then(fetchedMoves => {
      console.log('fetchedMoves: ', fetchedMoves)
      setDisplayedMoves(fetchedMoves)
    })
  }, [filter, moves])

  return (
    <div className={classes.root}>
      <Typography>Pokemon Moves ({filter}) ({displayedMoves.length})</Typography>

      <div className={classes.moveList}>
        {displayedMoves.map((move, i) => (
          <PokemonMoveCard key={move.name + i} move={move} />
        ))}
      </div>
    </div>
  )
}

export default PokemonMoves

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    width: '100%',
    padding: theme.spacing(3),
    border: '2px solid red',
  },
  moveList: {
    height: 600,
    overflow: 'scroll'
  }
}))