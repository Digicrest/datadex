import React, { useState, useEffect } from 'react'
import { InputAdornment, TextField, Icon } from '@material-ui/core'

export default function SearchBar({ label = 'Search', placeholder = 'Search...', onChange }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [submissionTimeout, setSubmissionTimeout] = useState(null)

    useEffect(() => {
        clearTimeout(submissionTimeout)
        console.log('Typing Timeout Interrupted, restarting!')

        setSubmissionTimeout(setTimeout(() => {
            console.log('Typing Timeout expired, submitting search!')
            onChange(searchTerm)
        }, 300))
    }, [searchTerm])

    const updateSearchTerm = e => {
        setSearchTerm(e.target.value)
    }

    return (
        <TextField
            id="search-input"
            label={label}
            placeholder={placeholder}
            onChange={updateSearchTerm}
            autoComplete='off'
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" className='search-icon'>
                        <Icon>search</Icon>
                    </InputAdornment>
                )
            }}
        />
    )
}