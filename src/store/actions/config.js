import * as Types from '../types/config'

export const setConfig = (prop, val) => {
    return {
        type: Types.SET_CONFIG,
        payload: { prop, val }
    }
}
