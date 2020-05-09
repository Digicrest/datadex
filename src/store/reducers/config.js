import * as Types from '../types/config'
import cloneDeep from 'lodash.clonedeep'

const init_state = {
    searchName: ''
}

const reducer = (state = init_state, action) => {
    switch (action.type) {        
        case Types.SET_CONFIG: { 
            let new_state = cloneDeep(state)
            new_state[action.payload.prop] = action.payload.val
            return new_state
        }
        
        default: {
            return state
        }
    }
}

export default  reducer