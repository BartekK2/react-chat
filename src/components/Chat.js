import React, {useState, useEffect, useRef} from 'react'
import {db} from "../firebaseThings/firebaseSetup"
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, } from "firebase/firestore";
import { TextField, Button, IconButton} from '@mui/material';
import {useAuth} from "../firebaseThings/AuthContext"
import {auth} from "../firebaseThings/firebaseSetup"
import {Box} from "@mui/material"
import { green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Chat() {
    const [messages, setMessages] = useState([])
    const messageInput = useRef("");
    const {currentUser} = useAuth()

    useEffect(() => {
        onSnapshot(query(collection(db, "messages"),orderBy("createdAt")), (doc) => {
            setMessages(doc.docs.map(doc => doc.data()));
        });
    },[])

    async function submitMessage(e, message=messageInput.current.value){
        e.preventDefault()

        await addDoc(collection(db, "messages"), {
            text: message,
            uid: currentUser.uid,
            createdAt: serverTimestamp(),
            username: currentUser.displayName,
            photoURL: currentUser.photoURL,
            email: currentUser.email
          });

        messageInput.current.value = ""
        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;

    }

    const Message = (props) => {
        const {id, message} = props;
        return (
            <>
                <Box style={{marginTop:'20px',marginRight:'10px',marginLeft: message.uid==currentUser.uid? 'auto':'10px',width:'40vh', }}>
                    <span style={{fontSize:'15px'}}>{message.username || message.email}</span>
                    <Box key={id}
                        style={{
                            
                            background:message.uid==currentUser.uid? green[400]:'#ddd',
                            padding:'10px',  borderRadius:"20px"
                        }}
                    >
                        {message.text}
                    </Box>
                </Box>
            </>
        )
    }

    return (
        <>
            <div id="chat" style={{display:'flex',flexDirection:'column',height:'70vh',overflowY:'auto'}}>
                {messages.map((message,id)=>{
                    return (<><Message id={id} message={message}></Message></>)
                })}
                
            </div>
            <div style={{display:'flex',width:'60%',marginLeft:'auto',marginRight:'auto',justifyContent:'space-evenly',marginTop:'30px',}}>
            <TextField inputRef={messageInput}/>
            <Button variant="contained" onClick={(e)=>submitMessage(e)}>Wyślij</Button>
            <Button variant="contained" onClick={(e)=>submitMessage(e,"💗")}
                sx={{borderRadius:'100%',padding:'auto',fontSize:'20px'}}>💗</Button>
            </div>
        </>
        
    )
}

export default Chat
