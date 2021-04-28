import { createMuiTheme } from '@material-ui/core'

const pokemon_palette = {
  red: "#FF0000",
  boston_university_red: "#CC0000",
  cerulean_blue: "#3B4CCA",
  golden_yellow: "#FFDE00",
  gold_foil: "#B3A125"
}

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#000000',
      secondary: '#FFFFFF'
    },
    primary: {
      main: pokemon_palette.cerulean_blue
    },
    secondary: {
      main: pokemon_palette.golden_yellow
    },
  },
  typography: {
    fontFamily: 'Quicksand, sans-serif',
  },
  overrides: {
    MuiButton: {
      root: {
        margin: 5
      }
    },
    MuiLink: {
      root: {
        color: '#f00',
        textTransform: 'uppercase',
        textDecoration: 'none',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#FFFFFF'
      }
    },
    MuiCard: {
      root: {
        borderRadius: 0,
      }
    },
    MuiCardHeader: {
      title: {
        fontWeight: 'bolder'
      },
      subheader: {
        fontWeight: 'bold'
      }
    }
  }
});

export { pokemon_palette };
export default theme;