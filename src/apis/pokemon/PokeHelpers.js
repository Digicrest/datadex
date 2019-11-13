export const getTypeColor = types => {
    const type = types.length > 1 ? types[1].type.name : types[0].type.name

    switch(type) {
        case 'electric': 
            return '#FFEE33';

        case 'fire': 
            return '#FF3333';

        case 'grass':
            return '#00FF00';

        case 'poison':
            return '#FF00FF';

        case 'water':
            return '#0000FF';

        case 'ice':
            return '#5555FF';

        default: 
            return '#000'
    }
}