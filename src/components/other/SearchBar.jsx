import React from './node_modules/react'

import { InputAdornment, TextField, Icon } from './node_modules/@material-ui/core'
import './css/SearchBar.css';

export function SearchBar(props) {
  return (
    <div id='searchbar'>
        <TextField
            id="search-input"
            label="Filter By Name"
            autoComplete='off'
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" className='search-icon'>
                        <Icon>search</Icon>
                    </InputAdornment>
                )
            }}
            onChange={ props.onChange }
        />
    </div>     
  )
}

export default SearchBar
