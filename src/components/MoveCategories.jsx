import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

function MoveCategories({ switchMoveCategory }) {
  const classes = useStyles();

  const filterLevel = () => switchMoveCategory('level-up');
  const filterTMTR = () => switchMoveCategory('machine');
  const filterEgg = () => switchMoveCategory('egg');
  const filterTutor = () => switchMoveCategory('tutor');

  return (
    <div className={classes.root}>
      <div className={classes.category}>
        <Typography onClick={filterLevel}>Level Up</Typography>
      </div>
      <div className={classes.category}>
        <Typography onClick={filterTMTR}>TM / TR</Typography>
      </div>
      <div className={classes.category}>
        <Typography onClick={filterEgg}>Egg</Typography>
      </div>
      <div className={classes.category}>
        <Typography onClick={filterTutor}>Tutor</Typography>
      </div>
    </div>
  )
}

export default MoveCategories

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    border:  '1px solid red',
    display: 'flex'
  },
  category: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  }
}))