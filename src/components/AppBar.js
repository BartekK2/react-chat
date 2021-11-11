import React from 'react'

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail'
import { Button, AppBar as AB, Toolbar, Typography,
    TextField, Grid, Badge, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from '../firebaseThings/AuthContext'

function AppBar() {
    const {logout} = useAuth();

    return (
        <AB position="static">
            <Toolbar >
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Messenger
            </Typography>
            <Grid container spacing={2} justifyContent="flex-end" sx={{flexGrow: 2}}>
                <Grid item>
                    <IconButton href="/react-chat" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton href="/react-chat/profile" color="inherit"><AccountCircleIcon/></IconButton>
                </Grid>
                <Grid item>
                <IconButton onClick={logout} color="inherit"><ExitToAppIcon/></IconButton>
                </Grid>
            </Grid>
            </Toolbar>
        </AB>
    )
}

export default AppBar
