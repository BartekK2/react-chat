import React, {useRef, useState, useEffect} from 'react'
import { Grid, TextField, Button, FormGroup, FormControlLabel, Checkbox, Alert } from '@mui/material'
import { useAuth } from '../firebaseThings/AuthContext'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom"

function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [unvalid, setUnvalid] = useState(true)
    const checkboxRef = useRef("")

    const isEmailValid = () => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    class CustomError extends Error {
        constructor(code = 'Coś złego sie stało', ...params) {
          super(...params);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
          }
          this.code = code;
        }
      }

    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        if(!(checkboxRef.current.checked)) throw new CustomError('Nie zgodziłeś sie na regulamin');
        if(password!=password2) throw new CustomError("Hasła sie nie zgadzają");
        await signup(email, password)
        window.location.replace("http://localhost:3000/react-chat/info");

      } catch(e) {
        setError(e.code)
      }
      setLoading(false)
    }

    useEffect(() => {
        setUnvalid(!isEmailValid())
    }, [email])

    return (
        <>
            {currentUser&&<Redirect to="/" />}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing = {2}
                sx={{ minWidth:'100vw', minHeight:'100vh' }}
            >     
                <Grid item>
                    <TextField error={unvalid} onChange={(e) => setEmail(e.target.value)} 
                        label="Email" required variant="outlined" helperText={unvalid && "To nie wygląda jak email"}/>
                </Grid>

                <Grid item>
                    <TextField error={password.length<8} onChange={(e) => setPassword(e.target.value)} type="password" 
                    label="Hasło" required variant="outlined" helperText={(password.length<8) && "Hasło musi być dłuższe"} />
                </Grid>

                <Grid item>
                    <TextField error={password2.length<8} onChange={(e) => setPassword2(e.target.value)} type="password" 
                    label="Powtórz hasło" required variant="outlined" helperText={(password2.length<8) && "Hasło musi być dłuższe"}/>
                </Grid>

                <Grid item>
                    <Button variant="contained" disabled={loading || unvalid || password.length<8} onClick={handleSubmit}>Zarejestruj się</Button>
                </Grid>
                <Grid item>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox inputRef={checkboxRef} />} label="Zgadzam sie na regulamin" />
                    </FormGroup>                
                </Grid>
                {error && <Alert severity="error">{error}</Alert>}
                <Grid item>
                    Masz już konto? <Link to="/login">Zaloguj sie</Link>
                </Grid>
            </Grid>
        </>
    )
}

export default RegisterForm
