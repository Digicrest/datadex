import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import ClippedCard from '../components/ClippedCard'
import theme from '../theme'

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Link to={'/characters'}>
        <div>
          <ClippedCard 
            fgColor={theme.palette.primary.main} 
            bgColor={theme.palette.secondary.light}
          />
        </div>
      </Link>

      <Link to={'/pokemon'}>
        <div>
          <ClippedCard 
            fgColor={"#CC0000"} 
            bgColor={theme.palette.primary.main}
          />
        </div>
      </Link> 
    </div>
  )
}

export default Home


const useStyles = makeStyles(theme => ({
  root: {
    height: '95vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing(2)
  }
}))