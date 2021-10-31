import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebaseSetup"
import { 
  onAuthStateChanged, signOut, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, updateEmail, updatePassword,
  setPersistence, browserLocalPersistence, browserSessionPersistence,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, FacebookAuthProvider,
  GithubAuthProvider

} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function setAuthPersistence(local){
    local? setPersistence(auth, browserLocalPersistence): setPersistence(auth, browserSessionPersistence);
  }

  function getPersistence(){
    return auth.persistenceManager.persistence.type;
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email)
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password)
  }

  function googleSignInWithPopUp(){
    signInWithPopup(auth, googleProvider);
  }
  
  function googleSignInWithRedirect(){
    signInWithRedirect(auth, googleProvider);
  }
  
  function facebookSignInWithPopUp(){
    signInWithPopup(auth, facebookProvider);
  }
  
  function facebookSignInWithRedirect(){
    signInWithRedirect(auth, facebookProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    setAuthPersistence,
    getPersistence,
    googleSignInWithPopUp,
    googleSignInWithRedirect,
    facebookSignInWithPopUp,
    facebookSignInWithRedirect
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}