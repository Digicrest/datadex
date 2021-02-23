import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { List, ListItem, ListItemIcon, ListItemText, Icon, Drawer, Typography, makeStyles, IconButton } from '@material-ui/core'
import { HomeOutlined, Refresh } from '@material-ui/icons';

const pokemon = [1, 4, 7, 25];
function NavigationDrawer({ isOpen, closeDrawer }) {
    const classes = useStyles()
    const [header, setHeader] = useState(pokemon[0])

    useEffect(swapHeaderImage, [])

    function swapHeaderImage() {
        const randomIndex = Math.floor(Math.random() * pokemon.length)
        setHeader(pokemon[randomIndex])
    }

    return (
        <Drawer  open={isOpen} onClose={closeDrawer}>
            <div className={classes.root}>
                <div class={classes.imageContainer}>
                    <img 
                        src={`/images/pokemon/${header}.png`} 
                        alt="Random Pokemon Sprite"
                    />

                    <IconButton
                        onClick={swapHeaderImage}
                        className={classes.changeImage}
                    >
                        <Refresh />
                    </IconButton>
                </div>
                <List>
                    {['', 'About'].map(routeName => (
                        <Link 
                            key={routeName} 
                            to={'/' + routeName} 
                            onClick={closeDrawer}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <Icon>
                                        <HomeOutlined />
                                    </Icon>
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


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '20vw',
        minWidth: 300,
        // padding: theme.spacing(1)
    },
    imageContainer: {
        position: 'relative'
    },
    changeImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        color: theme.palette.primary.main
    }
}))