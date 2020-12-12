import React from 'react'
import { Link } from "react-router-dom"
import { List, ListItem, ListItemIcon, ListItemText, Icon, Drawer, Typography, makeStyles } from '@material-ui/core'

function NavigationDrawer({ isOpen, closeDrawer }) {
    const classes = useStyles()

    return (
        <Drawer  open={isOpen} onClose={closeDrawer}>
            <div className={classes.root}>
                <Typography>Test Drawer</Typography>
                <List>
                    {['', 'About'].map(routeName => (
                        <Link key={routeName} to={'/' + routeName} className='nav-link' onClick={closeDrawer}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon>{}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={routeName || 'Home'} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        </Drawer>
    )
}

export default NavigationDrawer


const useStyles = makeStyles({
    root: {
        width: '20vw',
        minWidth: 200,
        padding: 20
    }
})