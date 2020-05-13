import React from 'react'
import './css/Tag.css'

import { getTypeColor } from '../../apis/pokemon/PokeHelpers'

function Tag(props) {
    const { id, name, type } = props
    const typeColor = getTypeColor(type)

    return (
        <div className='Tag'>
            {id && (
                <p className='Tag_ID'>
                    #{ id.toString().padStart(3, 0) }
                </p>
            )}

            {name && (
                <p className='Tag_name' style={{ color: typeColor ? typeColor.dark : '#000' }}>
                    { name }
                </p>
            )}
        </div>
    )
}

export default Tag
