import React, {useEffect} from 'react'
import { Button, AppBar, Toolbar, Typography, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../firebaseThings/AuthContext"
import Chat from './Chat';



function Dashboard() {
    const {logout, currentUser} = useAuth();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Messenger BK
                </Typography>
                <Button onClick={logout} color="inherit">Wyloguj</Button>
                </Toolbar>
            </AppBar>
            <Chat></Chat>
        </div>
    )
}

export default Dashboard
