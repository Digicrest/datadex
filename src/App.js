import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from './routes/Home'
import About from './routes/About'
import { 
    Container, 
    Typography, 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon,
    ListItemText,
    Icon
} from '@material-ui/core'


import './App.css'

export class App extends Component {
    
    componentDidMount() {
        // When the App is done loading; remove the loading screen
        document.getElementById('loading-screen').remove()
    }

    render() {
        return (
            <div className='app'>
                <Router>
                    {/* Navigation Bar */}
                    <List className='sidebar'>
                        {['Home', 'About'].map((routeName, index) => (
                            <Link to={'/' + routeName} className='nav-link'>
                                <ListItem button key={routeName}>
                                    <ListItemIcon>
                                        <Icon>mail</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={routeName} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                    {/* Content */}
                    <Container>
                        <Route path='/Home'>
                            <Home />
                        </Route>

                        <Route path='/About'>
                            <About />
                        </Route>
                    </Container>
                </Router>
            </div>
          
        )
    }
}

export default App