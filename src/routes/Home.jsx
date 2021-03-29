import { makeStyles } from '@material-ui/core'
import React from 'react'

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Home
    </div>
  )
}

export default Home


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))