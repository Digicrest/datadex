import React, { useState, useEffect, Fragment } from 'react'
import { Card, Collapse, makeStyles, Typography, GridList, GridListTile } from '@material-ui/core'
import LoadingSpinner from '../components/LoadingSpinner'
import { MenuBookOutlined, Settings, MusicNote } from '@material-ui/icons'
import PokemonCard from './PokemonCard'
import { connect } from 'react-redux'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()


function PokemonSpecies(props) {
  const { pokemon, colors } = props;
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <div className={classes.entryContainer}>
        <Typography className={`${classes.entryText} ${classes.bordered}`} variant='body2'>
          There is a plant seed on its back right from the day this pokemon is born. The seed slowly grows larger.
        </Typography>
        <Typography variant='caption' className={classes.label} style={{ fontStyle: 'italic' }}>
          Pokedex entry (from Pokemon Sword)
        </Typography>
      </div>

      <div style={{ margin: 10 }}>
        <GridList cellHeight='auto' spacing={5} cols={2} className={classes.grid}>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`}>
              <Typography variant={'body2'} className={classes.label}>
                2'4" (0.71 m)
              </Typography>
            </div>
            <Typography variant={'caption'} className={classes.label}>
              Height
            </Typography>
          </GridListTile>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`}>
              <Typography variant={'body2'} className={classes.label}>
                15.21 lbs (6.9 kg)
              </Typography>
            </div>
            <Typography variant={'caption'} className={classes.label}>
              Weight
            </Typography>
          </GridListTile>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`}>
              <MenuBookOutlined />
              <Settings />
            </div>
            <Typography variant={'caption'} className={classes.label}>
              dataDex Voice
            </Typography>
          </GridListTile>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`}>
              <MusicNote />
            </div>
            <Typography variant={'caption'} className={classes.label}>
              Cry
            </Typography>
          </GridListTile>
        </GridList>
      </div>
    </Card>
  )
}

export default PokemonSpecies


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
  entryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  entryText: {
    maxWidth: '70%',
    opacity: 0.7
  },
  grid: {
    padding: 5
  },
  gridTile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    opacity: 0.5,
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  section: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bordered: {
    padding: 10,
    border: '1px solid #00000020',
    borderRadius: 5
  }
})