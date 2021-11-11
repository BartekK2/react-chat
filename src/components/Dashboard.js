import React, {useEffect} from 'react'
import {useAuth} from "../firebaseThings/AuthContext"
import Chat from './Chat';
import { Redirect } from 'react-router';
import AppBar from './AppBar'

function Dashboard() {
    const {currenUser, exists} = useAuth();

    return (
        <div>
            {/* {exists || <Redirect to="/info" />} */}
            <AppBar/>
            <Chat></Chat>
        </div>
    )
}

export default Dashboard
