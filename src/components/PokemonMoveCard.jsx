import { Card, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { getDamageClassColor } from '../apis/pokemon/LocalHelpers';
import Type from './Pokemon/Type';
function PokemonMoveCard({ move }) {
  const classes = useStyles();
  
  function showMoveDetails() {
    console.log('Show Move Details: ', move)
  }

  return (
    <div className={classes.root} onClick={showMoveDetails}>
      <div className={classes.row}>
        {getTopleftComponent(move)}
        <Typography>{move.name}</Typography>
        <Typography>{move.power ? move.power : '-'}</Typography>
        <Typography>{move.accuracy ? move.accuracy : '-'}</Typography>
        <Typography>{move.pp ? move.pp : '-'}</Typography>
      </div>
      <div className={classes.row}>
        <Type type={move.type.name} />
        <div className={classes.damageClass} style={{
          backgroundColor: getDamageClassColor(move.damage_class.name.toLowerCase()).color
        }}>
          {move.damage_class.name.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

export default PokemonMoveCard

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    borderBottom: '2px solid #00000030',
  },
  row: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  damageClass: {
    width: 80,
    textAlign: 'center',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    transform: `skewX(-10deg)`,
    boxShadow: theme.shadows[2],
  }
}))

function getTopleftComponent(move) {
  const moveDetails = move.version_group_details[0]
  switch (moveDetails.move_learn_method.name) {
    case 'level-up': {
      return <Typography>{moveDetails.level_learned_at}</Typography>
    }
    case 'machine': {
      return <Typography>{moveDetails.level_learned_at}</Typography>
    }
    default: {
      return <Typography color='error'>Unhandled Move Type: {moveDetails.move_learn_method.name}</Typography>
    }
  }
}