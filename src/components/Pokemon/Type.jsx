import React, { useState } from 'react'
import './css/Type.css'

import { getTypeColor } from '../../apis/pokemon/PokeHelpers'

function Type(props) {
    const type = props.type
    const {name} = type.type
    const color = getTypeColor(name)

    const [textColor, setTextColor] = useState(color.light)
    const [bgColor, setBGColor] = useState(color.dark)

    return (
        <div className='Type_container' style={{ backgroundColor: bgColor }}
            onMouseEnter={() => {
                setTextColor(color.dark)
                setBGColor(color.light)
            }}
            onMouseLeave={() => {
                setTextColor(color.light)
                setBGColor(color.dark)
            }}
            onClick={e => {
                e.preventDefault()
                console.log(`[Type] Clicked ${name} - Go To Type Page`)
            }}
        >
            <p className='Type_name' style={{ color:  textColor }}>
                {name}
            </p>
        </div>
    )
}

export default Type
