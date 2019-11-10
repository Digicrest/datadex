import { combineReducers } from 'redux'

import databaseReducer from './database'

const reducer = combineReducers({
    database: databaseReducer
})

export default reducer