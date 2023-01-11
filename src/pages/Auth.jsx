import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { auth, provider, firestore } from '../config/firebase'
import { ProfileContext } from '../context/ProfileContext'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import Logo from '../images/logo.png'

const Auth = () => {
  const { profile, dispatch } = useContext(ProfileContext)

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)

        getDoc(doc(firestore, `profiles`, result.user.uid))
          .then((snap) => {
            if (snap.exists()) {
              dispatch({
                type: 'SET_PROFILE',
                payload: { id: snap.id, ...snap.data() },
              })
            } else {
              setDoc(doc(firestore, `profiles`, result.user.uid), {
                name: result.user.displayName,
              }).then(() => {
                setDoc(doc(firestore, `taskLists`, result.user.uid), {
                  list: [],
                }).then(() => {
                  dispatch({
                    type: 'SET_PROFILE',
                    payload: {
                      id: result.user.uid,
                      name: result.user.displayName,
                    },
                  })
                  dispatch({
                    type: 'SET_TASK_LIST',
                    payload: {
                      id: result.user.uid,
                      list: [],
                    },
                  })
                })
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
  return !profile ? (
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
