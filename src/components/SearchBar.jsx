import React from 'react'
import { connect } from 'react-redux'
import { setConfig } from '../store/actions/config'

import './css/SearchBar.css'
import { InputAdornment, TextField, Icon } from '@material-ui/core'

export function SearchBar(props) {
    function submit(term) {
        // props.setConfig('searchName',term)
        props.onChange(term)
    }

    let stoppedTyping;

  return (
    <TextField
        id="search-input"
        label={props.label || 'Search'}
        onChange={e => {
            let term = e.target.value
            clearTimeout(stoppedTyping)
            stoppedTyping = setTimeout(() => submit(term), 300)
        }}
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

const mapDispatchToProps = dispatch => {
    return {
        setConfig: (prop, value) => (
            dispatch(setConfig(prop, value))
        )
    }
}
export default connect(null, mapDispatchToProps)(SearchBar)
