import * as Types from '../types/config'
import cloneDeep from 'lodash.clonedeep'
import theme from '../../theme'

const init_state = {
    toolbarColor: theme.palette.primary.main
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