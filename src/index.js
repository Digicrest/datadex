import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import './index.css'

import App from './App'
import LoadingSpinner from './components/LoadingSpinner'

import store from './store/store'
let persistor = persistStore(store)

render (
    <Provider store={ store }>
        <PersistGate loading={ <LoadingSpinner /> } persistor={ persistor }>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
