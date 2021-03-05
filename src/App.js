import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { connect } from 'react-redux'

import NavigationDrawer from './NavigationDrawer'
import Home from './routes/Home'
import About from './routes/About'
import PokemonDetails from './routes/PokemonDetails'
import TypeDetails from './routes/TypeDetails'
import LoadingSpinner from './components/LoadingSpinner'
const Pokedex = require('pokeapi-js-wrapper')
const POKEDEX = new Pokedex.Pokedex()

function App(props) {
    const classes = useStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)

    const [pokemon, setPokemon] = useState([])
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        document.getElementById('loading-screen').remove()

        setFetching(true)
        POKEDEX.getPokemonsList().then(response => {
            const pokemonPromises = response.results.slice(0, 151).map(p => {
                return POKEDEX.getPokemonByName(p.name)
            })

            Promise.all(pokemonPromises).then(pokemon => {
                setPokemon(pokemon)
                setFetching(false)
            })
        })
    }, [])
   

    const openDrawer = () => setDrawerOpen(true)
    const closeDrawer = () => setDrawerOpen(false)

    return (
        <div className={classes.appContainer}>
            <BrowserRouter>
                <div className={classes.app}>
                    <NavigationDrawer 
                        isOpen={drawerOpen} 
                        openDrawer={openDrawer}
                        closeDrawer={closeDrawer}
                    />

                    <AppBar position='sticky' style={{
                        backgroundColor: props.toolbarColor
                    }}>
                        <Toolbar>
                            <IconButton onClick={openDrawer}>
                                <Menu />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    
                    <div className={classes.pageContent}>
                        { fetching ? <LoadingSpinner /> : (
                            <div className={"fade-in"}>
                                <Route exact path='/'>
                                    <div style={{ margin: 20 }}>
                                        <Home pokemon={pokemon} />
                                    </div>
                                </Route>

                                <Route path='/About'>
                                    <About />
                                </Route>

                                <Route path='/pokemon/:name' render={props => (
                                    <PokemonDetails name={props.match.params.name} />
                                )} />

                                <Route path='/types/:name' render={props => (
                                    <TypeDetails name={props.match.params.name} />
                                )} /> 
                            </div>
                        )}
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        toolbarColor: state.config.toolbarColor
    }
}

export default connect(mapStateToProps)(App)

const useStyles = makeStyles({
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    pageContent: {
        flex: 1,
    }
})