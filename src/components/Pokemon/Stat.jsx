import React from 'react'

export default function Stat(props) {
    const [value, setValue] = React.useState(props.stat.base_stat)

    React.useEffect(() => {
        setValue(props.stat.base_stat + props.level)
    }, [props.level])

    return (
        <div style={styles.stat}>
            <p>{props.stat.stat.name}</p>
            <p>{value}</p>
        </div>
    )
}

const styles = {
    stat: {
        flex: 1, 
        margin: 10, 
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: 'red'
    }
}