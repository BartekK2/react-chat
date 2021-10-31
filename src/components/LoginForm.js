import React, {useRef, useState, useEffect} from 'react'
import { Redirect} from 'react-router'
import { Link } from 'react-router-dom'
import { Grid, TextField, Button, FormGroup, FormControlLabel, Checkbox, Alert, ButtonGroup} from '@mui/material'
import { useAuth } from '../firebaseThings/AuthContext'
// ICONS
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, currentUser, setAuthPersistence, 
        getPersistence, googleSignInWithRedirect,
        facebookSignInWithPopUp,
    } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [unvalid, setUnvalid] = useState(false)
    const checkboxRef = useRef("")

    const isEmailValid = () => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        setAuthPersistence(checkboxRef.current.checked)
        await login(email, password)
      } catch(e) {
        setError({
            "auth/wrong-password": "Złe hasło",
            "auth/user-not-found": "Użytkownik nie istnieje"
          }[e.code])   
      }
      setLoading(false)
    }

    async function providerSignIn(e, func){
        e.preventDefault()

        try{
            setError("")
            setAuthPersistence(checkboxRef.current.checked)
            await func()
        } catch(e){
            setError({
                "auth/account-exists-with-different-credential":"Konto z tym emailem istnieje używając innego pośrednika"
            })
        }
    }

    useEffect(() => {
        setUnvalid(!isEmailValid())
    }, [email])

    return (
        <>
            {currentUser&&<Redirect to="/dashboard" />}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing = {2}
                sx={{ minWidth:'100vw', minHeight:'100vh' }}
            >
                <Grid item>
                    <ButtonGroup variant="text">
                        <Button onClick={googleSignInWithRedirect}><GoogleIcon/></Button>
                        <Button onClick={facebookSignInWithPopUp}><FacebookIcon/></Button>
                        <Button><GitHubIcon/></Button>
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <TextField error={unvalid} onChange={(e) => setEmail(e.target.value)} 
                        label="Email" variant="outlined"
                        helperText={unvalid && "To nie wygląda jak email"}/>
                </Grid>
                <Grid item>
                    <TextField error={password.length<8} onChange={(e) => setPassword(e.target.value)}
                        type="password" label="Hasło" variant="outlined"
                        helperText={(password.length<8) && "Hasło musi być dłuższe"}/>
                </Grid>
                <Grid item>
                    <Button variant="contained" disabled={loading || unvalid || (password.length<8)} onClick={handleSubmit}>Zaloguj</Button>
                </Grid>
                <Grid item>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox inputRef={checkboxRef} defaultChecked={getPersistence() === "LOCAL"} />} label="Pamiętaj mnie" />
                    </FormGroup>          
                </Grid>
                <Grid item>
                    {error && <Alert variant="outlined" sx={{width:'100%'}} severity="error">{error}</Alert>}
                </Grid>
                <Grid item>
                <Link to="/signup" style={{textDecoration:"none", color:"inherit",
                "&:hover":{textDecoration:"underline"}}}>Nie masz konta? Zarejestruj sie</Link>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginForm
