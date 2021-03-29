import { makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

const icons = {
  ash: require('../resources/images/characters/icons/ash.png'),
  misty: require('../resources/images/characters/icons/misty.png'),
  brock: require('../resources/images/characters/icons/brock.png'),
}
const characters = {
  misty: {
    name: {
      english: "Misty",
      japanese: "かすみ",
      romaji: "Kasumi"
    },
    description: `
      Water Gym Leader
    `,
    portrait: require('../resources/images/characters/portraits/misty.png')
  },
  ash: {
    name: {
      english: "Ash",
      japanese: "さとし",
      romaji: "Satoshi"
    },
    description: `
      As soon as he turned 10 years old, he realized he overslept. 
      Ash rushed to Professor Oak's Laboratory to get his first Pokémon. 
      Originally wanting to choose Squirtle, Bulbasaur, and Charmander, 
      but he ended up receiving the Pokémon Pikachu instead, 
      as he arrived late (thus leaving him with no other Starters to choose from). 
      At first, Pikachu did not obey Ash and kept running away, 
      so Ash had to tie him up. After getting chased by a flock of Spearow 
      later in the day thanks to Ash's recklessness, Ash attempted to save 
      Pikachu from them. 
      Seeing that Ash was so determined to help him, Pikachu protected Ash 
      from the Spearow by electrocuting the entire flock 
      (which was thanks to being struck by lightning at that exact moment 
        and having his Electric-type move supercharged). 
        From then on, Pikachu and Ash became best friends. 
        As an unskilled Trainer, Ash traveled with Misty and Brock 
        throughout the Kanto region, capturing new Pokémon 
        along the way.
    `,
    portrait: require('../resources/images/characters/portraits/ash.png')
  },
  brock: {
    name: {
      english: "Brock",
      japanese: "たけし",
      romaji: "Takeshi"
    },
    description: `
      Rock Gym Leader
    `,
    portrait: require('../resources/images/characters/portraits/brock.png')
  },
}

function Characters() {
  const classes = useStyles()
  const [character, setCharacter] = useState(characters.ash);

  useEffect(() => {
    console.log(`Character Swapped: `, character)
  }, [character])

  const switchCharacter = e => {
    setCharacter(characters[e.target.dataset.character])
  }

  return (
    <div className={classes.root}>
      <div className={classes.characters}>
        <img src={icons.ash} data-character="ash" alt='' className={classes.image} onClick={switchCharacter} />
        <img src={icons.misty} data-character="misty" alt='' className={classes.image} onClick={switchCharacter} />
        <img src={icons.brock} data-character="brock" alt='' className={classes.image} onClick={switchCharacter} />
      </div>

      <div>
        
        <div>
          <Typography variant='h4'>
            {character.name.english}
          </Typography>
          <Typography variant='h6'>
            {character.name.japanese}
          </Typography>
          <Typography variant='caption'>
            ({character.name.romaji})
          </Typography>
        </div>

        <div>
          <Typography className={classes.description}>
            {character.description}
          </Typography>
        </div>

        <img src={character.portrait} alt='' className={classes.fullSizeImage}  />
      </div>
    </div>
  )
}

export default Characters

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    margin: theme.spacing(2),
    minWidth: 125,
    height: 125,
    borderRadius: "50%",
    border: `1px solid ${theme.palette.primary.light}`,
    "&:hover": {
      boxShadow: theme.shadows[3]
    },
    backgroundColor: '#FFF'
  },
  fullSizeImage: {
    height: '80vh',
    width: "20vw"
  },
  characters: {
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    alignSelf: 'center',
    width: '90vw',
    maxWidth: 950,
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'scroll',
  },
  description: {
    opacity: 0.3,
    fontStyle: 'italic'
  }
}))