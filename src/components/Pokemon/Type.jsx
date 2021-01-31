import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { getTypeColor } from '../../apis/pokemon/LocalHelpers'

export default function Type({ type }) {
    const classes = useStyles()
    const [hovering, setHovering] = useState(false)
    const [name, setName] = useState(typeof type === 'string' ? type : type.type.name)
    const color = getTypeColor(name)

    return (
        <Link 
            to={`/types/${name}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={classes.root} 
            style={{ 
                backgroundColor: hovering ? color.light : color.dark
            }}
        >
            <p className={classes.name} style={{ color: hovering ? color.dark : color.light }}>
                {name}
            </p>
        </Link>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        margin: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        transform: `skewX(-10deg)`,
        boxShadow: theme.shadows[2],
        textDecoration: 'none',
        '&:hover': {
            boxShadow: 'none',
            opacity: 0.9
        }
    },
    name: {
        textAlign: 'center',
        fontSize: '.85rem',
        textTransform: 'capitalize'
    }
}))