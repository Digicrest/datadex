import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Container, List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core'

import Home from './routes/Home'
import About from './routes/About'
import PokemonDetails from './components/PokemonDetails'

import './App.css'

export class App extends Component {
    
    componentDidMount() {
        // When the App is done loading; remove the loading screen
        document.getElementById('loading-screen').remove()
    }

    render() {
        return (
            <Container className='app'>
                <Router>
                    {/* Navigation Bar */}
                    <List className='sidebar'>
                        {['Home', 'About'].map((routeName, index) => (
                            <Link key={routeName} to={'/' + routeName} className='nav-link'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon>mail</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={routeName} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                    {/* Content */}
                    <Container className='content'>
                        <Route path='/Home'>
                            <Home />
                        </Route>

                        <Route path='/About'>
                            <About />
                        </Route>

                        <Route 
                            path='/pokemon/:name' 
                            render={ props => <PokemonDetails name={ props.match.params.name } /> } 
                        />
                    </Container>
                </Router>
            </Container>
        )
    }
}

export default App