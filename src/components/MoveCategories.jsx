import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

function MoveCategories(props) {
  const classes = useStyles();
  console.log('MoveCategories: props: ', props)
  return (
    <div className={classes.root}>
      <Typography>MoveCategories</Typography>
    </div>
  )
}

export default MoveCategories

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'red'
  }
}))