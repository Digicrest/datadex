import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

import '../animations/rotate.css'
export default function LoadingSpinner({ name='MissingNo' }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <img
                    className={`${classes.image} Rotator`} 
                    src={'https://i.imgur.com/EHghstP.png'} 
                    alt={''}
                />
            </div>
            <Typography variant='h3'>A wild {name.substr(0, 1).toUpperCase() + name.slice(1)} appeared!</Typography>
        </div>
        
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        height: 100,
        width: 100,
        marginRight: 10
    },
    image: {
        width: '100%',  
        height: '100%'
    }
})