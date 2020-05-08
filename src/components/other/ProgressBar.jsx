import React from './node_modules/react'
import './css/ProgressBar.css'

export function ProgressBar(props) {
   let styles = getStyles(props)

    return (
        <div style={styles.wrapperStyle}>
            {props.label && <p>{props.label}</p>}  

            <div style={styles.outerStyle}>
                <div style={styles.innerStyle}></div>
            </div>
        </div>
    )
}

export default ProgressBar




function getStyles(props) {
    const wrapperStyle = {
        width: props.containerWidth ? `${props.containerWidth}%` : '100%', 
    }

    const outerStyle = {
        backgroundColor: props.emptyColor || '#A0A0A0',
        width: '100%',
        height: props.containerHeight || 20,
    }

    const innerStyle = { 
        width: `${props.count / props.maxCount * 100}%` || '25%',
        backgroundColor: (props.count / props.maxCount * 100 >= 100) 
            ? (props.finishColor || '#AAFFAA')
            :  (props.fillColor || '#AA55AA'),
    }

    return {
        wrapperStyle,
        outerStyle,
        innerStyle
    }
}