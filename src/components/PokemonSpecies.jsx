import React, { useState, useEffect, Fragment } from 'react'
import { Card, Collapse, makeStyles, Typography, GridList, GridListTile } from '@material-ui/core'
import LoadingSpinner from '../components/LoadingSpinner'
import { RecordVoiceOver, Settings, MusicNote } from '@material-ui/icons'
import PokemonCard from './PokemonCard'
import { connect } from 'react-redux'

const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()


function PokemonSpecies({ pokemon, colors }) {
  const classes = useStyles();
  const [species, setSpecies] = useState(null)
  const [pokedexEntry, setPokedexEntry] = useState(null)
  const [audioSource, setAudioSource] = useState(null)

  useEffect(() => {
    if (pokemon) {
      POKEDEX.getPokemonSpeciesByName(pokemon.name).then(fetchedSpecies => {
        const entries = fetchedSpecies.flavor_text_entries.filter(entry => entry.language.name === 'en')
        const chosen_entry = entries[Math.floor(Math.random() * entries.length)]
        
        POKEDEX.getVersionByName(chosen_entry.version.name).then(fetchedGameVersion => {
          const realGameName = fetchedGameVersion.name.split('-').map(w => w[0].toUpperCase() + w.substring(1)).join(' ')
          chosen_entry.version.name = realGameName
          setPokedexEntry(chosen_entry)
          setSpecies(fetchedSpecies)
        })
      })
    }
  }, [pokemon])

  function playCry() {
    let audioFile;
    try {
      audioFile = require(`../resources/audio/cries/mp3/${pokemon.name}.mp3`)
    } catch (error) { }
   
    // in case we're missing the audio file or the name doesn't match in the directory, just play nothing.
    if (!audioFile) { 
      alert('Not all sounds have been added yet, try a pokemon with a name starting with a, b or (maybe) c')
      console.warn('playCry() Missing Audio File for: ', pokemon.name)
      return; 
    }
    setAudioSource(audioFile)
  }

  if (!species || !pokedexEntry) {
    return <p>Loading Species...</p>
  }

  return (
    <Card className={classes.root}>
      <div className={classes.entryContainer}>
        <Typography className={`${classes.entryText} ${classes.bordered}`} variant='body2'>
          {pokedexEntry.flavor_text}
        </Typography>
        <Typography variant='caption' className={classes.label} style={{ fontStyle: 'italic' }}>
          Pokedex entry (from {pokedexEntry.version.name})
        </Typography>
      </div>

      <div style={{ margin: 10 }}>
        <GridList cellHeight='auto' spacing={5} cols={2} className={classes.grid}>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`}>
              <Typography variant={'body2'} className={classes.label}>
                {pokemon.height}ft
              </Typography>
            </div>
            <Typography variant={'caption'} className={classes.label}>
              Height
            </Typography>
          </GridListTile>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`}>
              <Typography variant={'body2'} className={classes.label}>
                {pokemon.weight} lbs <Typography variant='caption' style={{ opacity: 0.7, marginLeft: 5 }}>({(pokemon.weight /  2.205).toFixed(2)} kg)</Typography>
              </Typography>
            </div>
            <Typography variant={'caption'} className={classes.label}>
              Weight
            </Typography>
          </GridListTile>
          <GridListTile className={classes.gridTile}>
            {/* TODO: Speech Synthesis */}
            <div className={`${classes.section} ${classes.bordered}`} onClick={() => alert('Speech Synthesis has not been added yet.')} >
              <RecordVoiceOver style={{ color: colors.color }} />
              <Settings color='disabled' />
            </div>
            <Typography variant={'caption'} className={classes.label}>
              dataDex Voice
            </Typography>
          </GridListTile>
          <GridListTile className={classes.gridTile}>
            <div className={`${classes.section} ${classes.bordered}`} onClick={playCry}>
              <MusicNote style={{ color: colors.color }} />
              { audioSource !== null && (
                <audio hidden autoPlay onEnded={() => setAudioSource(null)}>
                  <source src={audioSource} type="audio/mp3" />
                </audio>
              )}
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