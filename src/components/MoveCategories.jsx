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
      <Typography onClick={filterLevel}>Level Up</Typography>
      <Typography onClick={filterTMTR}>TM / TR</Typography>
      <Typography onClick={filterEgg}>Egg</Typography>
      <Typography onClick={filterTutor}>Tutor</Typography>
    </div>
  )
}

export default MoveCategories

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'red'
  }
}))