import React, {useEffect} from 'react'
import AppBar from './AppBar'
import {Card, CardHeader, Grid, Avatar, Paper, Typography, CardContent} from '@mui/material'
import {useAuth} from '../firebaseThings/AuthContext'
import { useTheme } from '@mui/material/styles';

function Profile() {
    const {logout, currentUser, isUserInfoAlreadyExists, userInfo} = useAuth();
    const theme = useTheme();

    const CardStyled = (props)=>{
        const {children,sxPaper, sx, elevation} = props;
        return <Paper sx={sxPaper} elevation={elevation || 8}><Card sx={sx}>{children}</Card></Paper>
    }

    const ThreeDotsText = ({variant, children})=>{
        return <Typography variant={variant} sx={{textOverflow: 'ellipsis',width:'100%', overflow: 'hidden', whiteSpace: 'nowrap'}}>{children}</Typography>
    }

    useEffect(() => {
        isUserInfoAlreadyExists()
    }, [])

    return (
        <>
            <AppBar/>
            <div style={{padding:'30px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <CardStyled sxPaper={{height:'100%'}} sx={{
                            padding: 5, display:'flex',
                            alignItems:'center',gap: 5,}}>
                            <Avatar
                                alt={currentUser.displayName || currentUser.email}
                                src={currentUser.photoURL}
                                sx={{ width: 100, height: 100, border: 'solid 4px', borderColor:theme.palette.primary.main }}
                            />
                            <ThreeDotsText variant="h5">{currentUser.displayName || currentUser.email}</ThreeDotsText>
                        </CardStyled>
                    </Grid>
                    <Grid item xs={4}>
                        <CardStyled sxPaper={{height:'100%'}} sx={{height:'100%'}}>
                            <CardHeader title="Opis"/>

                            <CardContent>
                                <Typography>{userInfo? userInfo.info: "Wczytywanie..."}</Typography>
                            </CardContent>
                        </CardStyled>
                    </Grid>
                    <Grid item xs={4}>
                        <CardStyled sxPaper={{height:'100%'}} sx={{height:'100%', display:'flex', alignItems:'center'}}>
                            <CardHeader title="Płeć"/>

                            <CardContent>
                                <Typography>{userInfo? userInfo.plec=="F"? 
                                <>
                                    <img style={{height:30, width:30}} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/girl_1f467.png"/>
                                    <span> - Kobieta</span></>:
                                <>
                                    <img style={{height:30, width:30}} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/boy_1f466.png"/>
                                    <span> - Mężczyzna</span>
                                </>:"Wczytywanie..."
                                }</Typography>
                            </CardContent>
                        </CardStyled>
                    </Grid>
                    <Grid item xs={8}>
                        <CardStyled>xs=8</CardStyled>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Profile
