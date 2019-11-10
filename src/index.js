import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import persistStore from 'redux-persist/es/persistStore'

import store from './store/store'

import App from './App'
import Loader from './components/Loader'

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={ <Loader /> } persistor={ persistor }>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
