import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

export default function Stat({ stat, level }) {
    const classes = useStyles()
    const [value, setValue] = useState(stat.base_stat)

    useEffect(() => {
        setValue(stat.base_stat + level)
    }, [level])

    return (
        <div className={classes.root}>
            <p>{stat.stat.name}</p>
            <p>{value}</p>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flex: 1, 
        margin: 10, 
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: 'red'
    }
})