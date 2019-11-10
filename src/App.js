import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import Home from './routes/Home'
import About from './routes/About'

export class App extends Component {
    render() {
        return (
            <Router>
                <Route path='/Home'>
                    <Home />
                </Route>

                <Route path='/About'>
                    <About />
                </Route>
            </Router>
        )
    }
}

export default App
