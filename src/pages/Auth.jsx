import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { auth, provider, firestore } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { ProfileContext } from '../context/ProfileContext'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import Logo from '../images/logo.png'

const Auth = () => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ProfileContext)

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)
      })
      .then(() => {
        getDoc(doc(firestore, `profiles`, currentUser.uid))
          .then((snap) => {
            if (snap.exists()) {
              dispatch({
                type: 'SET_PROFILE',
                payload: { id: snap.id, ...snap.data() },
              })
            } else {
              setDoc(doc(firestore, `profiles`, currentUser.uid), {
                name: currentUser.displayName,
              })
            }
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error)
        console.error(error)
        // setError(error.message)
      })
  }
  return !currentUser ? (
    <div className='auth'>
      <img src={Logo} alt='Pomas' />
      <h1>Pomas</h1>
      <button onClick={signIn}>
        <span>G</span>Sign in with Google
      </button>
    </div>
  ) : (
    <Navigate to='/' />
  )
}

export default Auth
