import * as Types from '../types/database'
import cloneDeep from 'lodash.clonedeep'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
    localStorage: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Types.LOCAL_STORAGE_ADD: {
            console.log('LOCAL_STORAGE_ADD')

            return cloneDeep(state)
        }

        case Types.LOCAL_STORAGE_REMOVE: {
            console.log('LOCAL_STORAGE_REMOVE')

            return cloneDeep(state)
        }

        default: {
            return cloneDeep(state)
        }
    }
}

const persistConfig = {
    key: 'database',
    storage
}

export default persistReducer(persistConfig, reducer);