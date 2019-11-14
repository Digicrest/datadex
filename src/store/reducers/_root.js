import storage from 'redux-persist/lib/storage/index'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'

import databaseReducer from './database'

const persistedDatabaseReducer = persistReducer({
    key: 'database',
    storage: storage
}, databaseReducer)


const rootReducer = combineReducers({
    database: persistedDatabaseReducer
});

export default rootReducer