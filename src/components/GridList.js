import React from 'react'
import Grid from '@material-ui/core/Grid'

export default function GridList(props) {
    return (
        <Grid container spacing={2}>
            {props.data.map((datum, i) => (
                <Grid key={i} item xs={12} md={6}>
                    {props.renderItem(datum)}
                </Grid>
            ))}
        </Grid>
    )
}