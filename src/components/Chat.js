import React, {useState, useEffect, useRef} from 'react'
import {db} from "../firebaseThings/firebaseSetup"
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { TextField, Button } from '@mui/material';
import {useAuth} from "../firebaseThings/AuthContext"
import {auth} from "../firebaseThings/firebaseSetup"

function Chat() {
    const [messages, setMessages] = useState([])
    const messageInput = useRef("");
    const {currentUser} = useAuth()

    useEffect(() => {
        onSnapshot(collection(db, "messages"), (doc) => {
            setMessages(doc.docs.map(doc => doc.data()));
        });
    },[])

    async function submitMessage(e){
        e.preventDefault()

        await addDoc(collection(db, "messages"), {
            text: messageInput.current.value,
            uid: currentUser.uid,
            createdAt: serverTimestamp(),
            username: currentUser.displayName,
            photoURL: currentUser.photoURL,
            email: currentUser.email
          });

        messageInput.current.value = ""
    }


    return (
        <>
            <div style={{display:'flex',flexDirection:'column'}}>
                {messages.map((message,id)=>{
                    return (<><p 
                        style={{width:'40vh', marginLeft: message.uid==currentUser.uid? 'auto':'0'}} key={id}>
                        {message.text}  Użytkownik:<span style={{fontSize:'15px'}}>{message.username || message.email}</span></p></>)
                })}
                
            </div>
            <div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
            <TextField inputRef={messageInput}/>
            <Button onClick={submitMessage}>Wyślij</Button></div>
        </>
        
    )
}

export default Chat
