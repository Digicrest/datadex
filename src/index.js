import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import store from './store/store'

import App from './App'
import Loader from './components/Loader'

ReactDOM.render(
    <Provider store={ store.store }>
        <PersistGate loading={ <Loader /> } persistor={ store.persistor }>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
