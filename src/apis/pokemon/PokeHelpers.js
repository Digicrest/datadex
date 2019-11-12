export const getTypeColor = types => {
    const type = types.length > 1 ? types[1].type.name : types[0].type.name

    switch(type) {
        case 'electric': 
            return '#FFEE3380';

        case 'fire': 
            return '#FF000080';

        case 'grass':
            return '#00FF0080';

        case 'poison':
            return '#FF00FF80';

        case 'water':
            return '#0000FF80';

        default: 
            return '#000'
    }
}