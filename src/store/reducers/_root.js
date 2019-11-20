import storage from 'redux-persist/lib/storage/index'

import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

import databaseReducer from './database'
import configReducer from './config'

const persistedDatabaseReducer = persistReducer({ key: 'database', storage: storage }, databaseReducer)
const persistedConfigReducer = persistReducer({ key: 'config', storage: storage }, configReducer)


const rootReducer = combineReducers({
    database: persistedDatabaseReducer,
    config: persistedConfigReducer
});

export default rootReducer