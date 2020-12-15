import React, { useState, useEffect } from 'react'
import { getTypeColor } from '../apis/pokemon/LocalHelpers'
import { makeStyles, Typography } from '@material-ui/core'


const Pokedex = require("pokeapi-js-wrapper")
const POKEDEX = new Pokedex.Pokedex()

export default function TypeDetails({ name }) {
    const classes = useStyles();
    const [details, setDetails] = useState(null)
    const [colors, setColors] = useState({
        dark: '#333',
        light: '#EEE',
        color: '#777'
    })

    useEffect(() => {
        setColors(getTypeColor(name))

        POKEDEX.getTypeByName(name).then(details => {
            console.log(details)
            setDetails(details)
        })
    }, [name])

    return (
        <div className={classes.root} style={{ backgroundColor: colors.light }}>
            <Typography variant='h1' className={classes.title} style={{ color: colors.dark }}>
                {name.toUpperCase()}
            </Typography>

            {!!details && (
                details.names.map(t => (
                    <p key={t.name} style={{ textAlign: 'center', color: colors.dark }}>{t.language.name}: {t.name}</p>
                ))
            )}
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        flex: 1,
        height: '80vh',
        padding: 20,
        borderRadius: 10,
        boxShadow:'2px 2px 4px #00000040',
    },
    title: {
        textAlign: 'center'
    }
})