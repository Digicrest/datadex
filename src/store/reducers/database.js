import * as Types from '../types/database'
import cloneDeep from 'lodash.clonedeep'

const init_state = {
    pokemon: []
}

const reducer = (state = init_state, action) => {
    switch (action.type) {        
        case Types.CACHE_POKEMON: { 

            if (state.pokemon.map(p => p.id).includes(action.payload.id)) {
                console.error('[DatabaseReducer] CACHE_POKEMON: This Pokemon is already stored: ', action.payload)
                return cloneDeep(state)
            }

            let new_state = cloneDeep(state)
            new_state.pokemon = [ ...new_state.pokemon, action.payload ]
            return new_state
        }

        case Types.UNCACHE_POKEMON: {
            const index = state.pokemon.map(p => p.id).indexOf(action.payload.id)

            let new_state = cloneDeep(state)
            new_state.pokemon.splice(index, 1)

            return new_state
        }

        default: {
            return state
        }
    }
}

export default  reducer