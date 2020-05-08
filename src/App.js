import React, { useEffect } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import { Container } from '@material-ui/core'

import Home from './routes/Home'
import About from './routes/About'

import './App.css'

export function App() {
    
    useEffect(() => {
        // When the App is done loading; remove the loading screen
        document.getElementById('loading-screen').remove()
    }, [])
 

    return (
        <Container className='app'>
            <BrowserRouter>
                <Route exact path='/'>
                    <Home />
                </Route>

                <Route path='/About'>
                    <About />
                </Route>

                {/* <Route 
                    path='/pokemon/:name' 
                    render={props => (
                        <PokemonDetails name={ props.match.params.name } />
                    )} 
                /> */}
            </BrowserRouter>
        </Container>
    )
}

export default App