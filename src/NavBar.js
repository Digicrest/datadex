import React from 'react'
import {  Link } from "react-router-dom"
import {  List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core'

function NavBar() {
    return (
        <List className='sidebar'>
            {['', 'About'].map((routeName, index) => (
                <Link key={routeName} to={'/' + routeName} className='nav-link'>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon>{}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={routeName || 'Home'} />
                    </ListItem>
                </Link>
            ))}
        </List>
    )
}

export default NavBar
