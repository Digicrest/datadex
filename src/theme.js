import { createMuiTheme } from '@material-ui/core'

const pokemonLogo = {
  yellow: "#ffcb05",
  lightBlue: "#2a75bb"
}

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#000000',
      secondary: '#FFFFFF'
    },
    primary: {
      main: pokemonLogo.lightBlue
    },
    secondary: {
      main: pokemonLogo.yellow
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

export default theme;