import React, { Component } from 'react'

import { InputAdornment, TextField, Icon } from '@material-ui/core'
import './css/SearchBar.css';

export class SearchBar extends Component {
  render() {
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
              onChange={ this.props.onChange }
              defaultValue={ this.props.defaultValue }
          />
      </div>     
    )
  }
}

export default SearchBar
