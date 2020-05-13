import storage from 'redux-persist/lib/storage/index'

import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

import databaseReducer from './database'
import configReducer from './config'
import profileReducer from './profile'

const persistedDatabaseReducer = persistReducer({ key: 'database', storage: storage }, databaseReducer)
const persistedConfigReducer = persistReducer({ key: 'config', storage: storage }, configReducer)
const persistedProfileReducer = persistReducer({ key: 'profile', storage: storage }, profileReducer)


const rootReducer = combineReducers({
    database: persistedDatabaseReducer,
    config: persistedConfigReducer,
    profile: persistedProfileReducer
});

export default rootReducer