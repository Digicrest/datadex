import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { getTypeColor } from '../../apis/pokemon/LocalHelpers'

export default function Type({ type }) {
    const classes = useStyles()
    const [hovering, setHovering] = useState(false)

    const { name } = type.type
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

const useStyles = makeStyles({
    root: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        transform: `skewX(-10deg)`,
        boxShadow: '1px 1px 3px #00000060',
        textDecoration: 'none',
        '&:hover': {
            boxShadow: 'none',
            opacity: 0.7
        }
    },
    name: {
        textAlign: 'center',
        fontSize: '.85rem',
        textTransform: 'capitalize'
    }
})