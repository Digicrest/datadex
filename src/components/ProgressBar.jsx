import React from 'react'
import './css/ProgressBar.css'

export function ProgressBar(props) {
    const wrapperStyle = {
        width: props.containerWidth ? `${props.containerWidth}%` : '100%', 
    };
    const outerStyle = {
        backgroundColor: props.emptyColor || '#A0A0A0',
        width: '100%',
        height: props.containerHeight || 20,
    };
    const innerStyle = { 
        width: `${props.count / props.maxCount * 100}%` || '25%',
        backgroundColor: (props.count / props.maxCount * 100 >= 100) 
            ? (props.finishColor || '#AAFFAA')
            : (props.fillColor || '#AA55AA'),
    };

    return (
        <div className='ProgressBar-Wrapper' style={ wrapperStyle }>
            { props.label && <p className='ProgressBar-Label'>{ props.label }</p> }  

            <div className='outer' style={ outerStyle }>
                <div className='inner' style={ innerStyle }></div>
            </div>
        </div>
    )
}

export default ProgressBar