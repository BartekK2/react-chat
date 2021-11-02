import { doc, setDoc, getDoc } from "firebase/firestore"; 
import {db} from "../firebaseThings/firebaseSetup";
import {useAuth} from "../firebaseThings/AuthContext";
import React, {useState, useEffect, useReducer} from 'react';
import { Redirect } from "react-router";
import {Grid, Button, TextField, Alert, FormControlLabel} from "@mui/material";
import TwoChoiceSwitch from "./components-elements/TwoChoiceSwitch";
import FormGroup from '@mui/material/FormGroup';


function RegisterInfo() {
    const {currentUser, exists,isUserInfoAlreadyExists} = useAuth();
    
    const reducer = (state, action)=>{
        switch (action.type) {
            case 'wiek':
                return {...state, wiek: action.value};
            case 'info':
                return {...state, info: action.value};
            case 'plec':
                return {...state, plec: action.value};
          default:
            throw new Error();
        }
    }
    const [state, dispatch] = useReducer(reducer, {wiek: 0, info:"", plec:"F"});

    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`wiek: ${state.wiek} info: ${state.info} plec: ${state.plec}`)
        try{
            await setDoc(doc(db, "users", currentUser.email), {
                wiek: state.wiek,
                info: state.info,
                plec: state.plec
            });
            isUserInfoAlreadyExists()
        }catch(error){
            setError(error)
        }
    }

    return (
        <>
            {exists&&<Redirect to="/" />}
            
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing = {2}
                sx={{ minWidth:'100vw', minHeight:'100vh' }}
            >
                <Grid item>
                    <TextField onChange={(e) => dispatch({type: 'info', value: e.target.value})} 
                    label="Informacje" variant="outlined" helperText={"Informacje widoczne w twoim profilu"} />
                </Grid>

                <Grid item>
                    <TextField onChange={(e) => dispatch({type: 'wiek', value: e.target.value})} 
                    label="Wiek" error={state.wiek < 15} variant="outlined" helperText={state.wiek<15 && "Musisz mieć skończone 15 lat"} />
                </Grid>

                <Grid item>
                    <FormGroup>
                        <FormControlLabel control={
                            <TwoChoiceSwitch required onChange={(e) => dispatch({type:'plec', value: e.target.checked? "M":"F"})}
                                firstIcon="url(https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/boy_1f466.png)"
                                secondIcon="url(https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/girl_1f467.png)"
                            />
                        } label="Płeć" labelPlacement="top"
                        />
                    </FormGroup>

                </Grid>

                <Grid item>
                    <Button variant="contained" onClick={handleSubmit}>Akceptuj</Button>
                </Grid>

                <Grid item>
                    <Alert severity="info">Możesz pominąć pola nie wymagane i ustawić je później w swoim profilu</Alert>
                </Grid>

                {error && <Alert severity="error">{error.code}</Alert>}
            </Grid>

        </>
    )
}

export default RegisterInfo
