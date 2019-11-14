const colors = {
    types: {
        electric: '#FFEE33',
        fire:     '#FF3333',
        grass:    '#00FF00',
        bug:      '#229922',
        poison:   '#FF00FF',
        water:    '#0000FF',
        ice:      '#5555FF'
    }
}

export const getTypeColor = types => {
    const type = types.length > 1 ? types[1].type.name : types[0].type.name
    return colors.types[type]
}

