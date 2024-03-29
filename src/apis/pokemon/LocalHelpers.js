import natures from '../../resources/constants/natures'
import colors from '../../resources/constants/colors'

export const getNaturesForStat = statName => {
    const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

    if (!stats.includes(statName)) {
        console.error('How did you get here? ¯\\_(ツ)_/¯')
        return;
    }

    return natures[statName.split('-').join('')]
}

export const types = [
    'bug', 'dark', 'dragon', 'electric', 'fairy',
    'fighting', 'fire', 'flying', 'ghost', 'grass',
    'ground', 'ice', 'normal', 'poison', 'psychic',
    'rock', 'steel', 'water'
];


export const getTypeColor = type => {
    return colors.types[type]
}
export const getDamageClassColor = damageClass => {
    return colors.damage_class[damageClass]
}

export const getStatColor = stat => {
    return colors.stats[stat]
}

/*
    Maximum IV is 31.
    Maximum EV is 255, which is 63 stat points.
    Nature adds on an extra 10%, (not for HP).
    So you get: ( BaseStat × 2 + 5 + 31 + 63 ) × 1.1 with 10 instead of 5 for HP. Then you round it down afterwards.

    FORMULA FOR HP:
    BaseStat × 2 + 204

    FORMULA FOR OTHER STATS:
    ( BaseStat × 2 + 99 ) × 1.1
*/

export const statProjection = () => {
    // const gainedFromEV = Math.floor(stat.evs / 4)
    // const gainedFromIV = stat.iv
    // const gainedFromNature = getAffectingNatures(stat.name) // -> 
}


export function getBetterSprite(pokemonID) {
    if (typeof pokemonID !== "number") {
       console.error('getBetterSprite() requires a pokemon ID as a number value to be passed.')
       return;
    }

    const spriteURL = `https://www.pokencyclopedia.info/sprites/artworks/art-hd_anime/art-hd_anime_${pokemonID.toString().padStart(3, '0')}.png`
    return spriteURL;
} 
