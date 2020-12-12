import React from 'react'

export default function ProgressBar(props) {
    let styles = getStyles(props)

    return (
        <div style={styles.wrapper}>
            {props.label && <p>{props.label}</p>}  

            <div style={styles.outer}>
                <div style={styles.inner}>
                </div>
            </div>
        </div>
    )
}

function getStyles({ 
    containerWidth = '100%',
    emptyColor = '#FFAAAA',
    containerHeight = 20,
    count = 25,
    maxCount = 100,
    finishColor = '#AAFFAA',
    fillColor = '#AAAAFF',
    rounded = true
}) {
    const wrapper = { width: containerWidth }

    const outer = {
        width: '100%',
        height: containerHeight,
        backgroundColor: emptyColor,
        borderRadius: rounded ? 400 : 0,
        overflow: 'hidden'
    }

    const inner = { 
        height: containerHeight,
        width: `${count / maxCount * 100}%`,
        backgroundColor: (count / maxCount * 100 >= 100) ? finishColor : fillColor,
    }

    return { wrapper, outer, inner }
}