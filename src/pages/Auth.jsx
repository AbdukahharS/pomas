import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { auth, provider } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Logo from '../images/logo.png'

const Auth = () => {
  const { currentUser } = useContext(AuthContext)

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)
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
