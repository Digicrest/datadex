import { makeStyles } from '@material-ui/core'
import React from 'react'

function ClippedCard({ fgColor='#EEE', bgColor='#999' }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.panel} style={{ backgroundColor: bgColor }}>
      </div>
      <div className={`${classes.panel} clipped-container-for-shadow`}>
        <div className={`${classes.panel} clipped`}  style={{ backgroundColor: fgColor }}>
        </div>
      </div>
    </div>
  )
}

export default ClippedCard

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    width: 500,
    height: 900,
    backgroundColor: 'black',
    position: 'relative',
    borderRadius: "15px",
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    transition: "all 0.4s",
    opacity: 0.7,
    "&:hover": {
      transition: "all 0.2s",
      opacity: 1,
      boxShadow: theme.shadows[15],
      padding: theme.spacing(2)
    }
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    height: "101%",
  }
}))
