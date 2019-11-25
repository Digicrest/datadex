// Every Pokemon Type
export const types = [ 
    'bug', 'dark', 'dragon', 'electric','fairy', 
    'fighting', 'fire', 'flying','ghost', 'grass', 
    'ground', 'ice', 'normal', 'poison', 'psychic', 
    'rock', 'steel','water'
];

//  Colors are from Bulbapedia
export const palette = {
    types: {
        bug:        { color: '#A8B820', light: '#C6D16E', dark: '#6D7815' },
        dark:       { color: '#705848', light: '#A29288', dark: '#49392F' },
        dragon:     { color: '#7038F8', light: '#A27DFA', dark: '#4924A1' },
        electric:   { color: '#F8D030', light: '#FAE078', dark: '#A1871F' },
        fairy:      { color: '#EE99AC', light: '#F4BDC9', dark: '#9B6470' },
        fighting:   { color: '#C03028', light: '#D67873', dark: '#7D1F1A' },
        fire:       { color: '#F08030', light: '#F5AC78', dark: '#9C531F' },
        flying:     { color: '#A890F0', light: '#C6B7F5', dark: '#6D5E9C' },
        ghost:      { color: '#705898', light: '#A292BC', dark: '#493963' },
        grass:      { color: '#78C850', light: '#A7DB8D', dark: '#4E8234' },
        ground:     { color: '#E0C068', light: '#EBD69D', dark: '#927D44' },
        ice:        { color: '#98D8D8', light: '#BCE6E6', dark: '#638D8D' },
        normal:     { color: '#A8A878', light: '#C6C6A7', dark: '#6D6D4E' },
        poison:     { color: '#A040A0', light: '#C183C1', dark: '#682A68' },
        psychic:    { color: '#F85888', light: '#FA92B2', dark: '#A13959' },
        rock:       { color: '#B8A038', light: '#D1C17D', dark: '#786824' },
        steel:      { color: '#B8B8D0', light: '#D1D1E0', dark: '#787887' },
        water:      { color: '#6890F0', light: '#9DB7F5', dark: '#445E9C' }
    }
}

export const getTypeColor = type => {
    return palette.types[type]
}

