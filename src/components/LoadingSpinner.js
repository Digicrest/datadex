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
        </div>
        
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
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