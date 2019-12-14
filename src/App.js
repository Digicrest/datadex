import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Container, List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core'

import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import PokemonDetails from './components/PokemonDetails.jsx'

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
                        {['', 'About'].map((routeName, index) => (
                            <Link key={routeName} to={'/' + routeName} className='nav-link'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon>{}</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={routeName || 'Home'} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                    {/* Content */}
                    <Container className='content'>
                        <Route exact path='/'>
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