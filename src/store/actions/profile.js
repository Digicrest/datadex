import * as Types from '../types/profile'

export const catchPokemon = pokemon => {
    return {
        type: Types.CATCH_POKEMON,
        payload: pokemon
    }
}

export const releasePokemon = pokemon => {
    return {
        type: Types.RELEASE_POKEMON,
        payload: pokemon
    }
}