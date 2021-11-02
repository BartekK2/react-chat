import React, {useEffect} from 'react'
import { Button, AppBar, Toolbar, Typography,
    TextField, Grid, Badge, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../firebaseThings/AuthContext"
import Chat from './Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail'
import { Redirect } from 'react-router';

function Dashboard() {
    const {logout, currentUser, exists} = useAuth();

    return (
        <div>
            {exists || <Redirect to="/info" />}
            <AppBar position="static">
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
                        <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit"><AccountCircleIcon/></IconButton>
                    </Grid>
                    <Grid item>
                    <IconButton onClick={logout} color="inherit"><ExitToAppIcon/></IconButton>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <Chat></Chat>
        </div>
    )
}

export default Dashboard
