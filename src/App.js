import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

import NavigationDrawer from './NavigationDrawer'
import Home from './routes/Home'
import About from './routes/About'
import PokemonDetails from './routes/PokemonDetails'
import TypeDetails from './routes/TypeDetails'

function App() {
    const classes = useStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        document.getElementById('loading-screen').remove()
    }, [])
   

    const openDrawer = () => setDrawerOpen(true)
    const closeDrawer = () => setDrawerOpen(false)

    return (
        <div className={classes.appContainer}>
            <BrowserRouter >
                <div className={classes.app}>
                    <NavigationDrawer 
                        isOpen={drawerOpen} 
                        openDrawer={openDrawer}
                        closeDrawer={closeDrawer}
                    />

                    <AppBar position='sticky' >
                        <Toolbar>
                            <IconButton onClick={openDrawer}>
                                <Menu />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    
                    <div className={classes.pageContent}>
                        <Route exact path='/'>
                            <div style={{ margin: 20 }}>
                                <Home />
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
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App

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