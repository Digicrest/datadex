import * as Types from '../types/database'


export const add = item => {
    return {
        type: Types.LOCAL_STORAGE_ADD,
        payload: item
    }
}

export const remove = item => {
    return {
        type: Types.LOCAL_STORAGE_ADD,
        payload: item
    }
}