import * as Types from '../types/profile'
import cloneDeep from 'lodash.clonedeep'

const init_state = {
    caughtPokemon: []
}

const reducer = (state = init_state, action) => {
    switch (action.type) {        
        case Types.CATCH_POKEMON: { 
            let newState = cloneDeep(state)
            newState.caughtPokemon.push(action.payload)
            return newState
        }

        case Types.RELEASE_POKEMON: { 
            let newState = cloneDeep(state)
            
            let foundIndex = newState.caughtPokemon
                .map(pokemon => pokemon.id)
                .indexOf(action.payload.id)

            if (foundIndex !== -1) {
                newState.caughtPokemon.splice(foundIndex, 1)
            } else {
                console.error('[Reducer/Profile] Types.RELEASE_POKEMON: Unable to Release Pokemon. Was not found in List of Caught Pokemon.')
            }

            return newState
        }
        
        default: {
            return state
        }
    }
}

export default  reducer