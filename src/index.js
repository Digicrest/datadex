import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
import './index.css'

import App from './App'
import PokemonLoader from './components/other/loaders/Pokemon'

import store from './store/store'
let persistor = persistStore(store)

render (
    <Provider store={ store }>
        <PersistGate loading={ <PokemonLoader /> } persistor={ persistor }>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
