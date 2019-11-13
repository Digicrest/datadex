import * as Types from '../types/database'
import cloneDeep from 'lodash.clonedeep'

import storage from 'redux-persist/lib/storage/index'
import { persistReducer } from 'redux-persist'

const initialState = {
    pokemon: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {        
        case Types.CACHE_POKEMON: { 
            let new_state = cloneDeep(state)
            new_state.pokemon = state.pokemon.concat(action.payload)

            return new_state
        }

        case Types.UNCACHE_POKEMON: {
            const index = state.pokemon.map(p => p.id).indexOf(action.payload.id)

            let new_state = cloneDeep(state)
            new_state.pokemon.splice(index, 1)

            return new_state
        }

        default: {
            return cloneDeep(state)
        }
    }
}

const persistConfig = {
    key: 'database',
    storage: storage
}

export default persistReducer(persistConfig, reducer);