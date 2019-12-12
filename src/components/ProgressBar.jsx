import React, { Component } from 'react'
import './css/ProgressBar.css'

export class ProgressBar extends Component {
    
    render() {
        return (
            <div className='ProgressBar-Wrapper' style={{
                width: this.props.containerWidth ? `${this.props.containerWidth}%` : '100%', 
               
            }}>
                { this.props.label && <p className='ProgressBar-Label'>{ this.props.label }</p>}  

                <div className='outer' style={{
                    backgroundColor: this.props.emptyColor || '#A0A0A0',
                    width: '100%',
                    height: this.props.containerHeight || 20,
                }}>
                    <div className='inner' style={{ 
                        width: `${this.props.count / this.props.maxCount * 100}%` || '25%',
                        backgroundColor: (this.props.count / this.props.maxCount * 100 >= 100) 
                            ? (this.props.finishColor || '#AAFFAA')
                            : (this.props.fillColor || '#AA55AA'),
                    }}>    
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default ProgressBar