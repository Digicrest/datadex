import * as Types from '../types/database'


export const cachePokemon = pokemon => {
    return {
        type: Types.CACHE_POKEMON,
        payload: pokemon
    }
}

export const uncachePokemon = pokemon => {
    return {
        type: Types.UNCACHE_POKEMON,
        payload: pokemon
    }
}