import { useEffect, useContext } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import Section from '../components/Section'
import { ProfileContext } from '../context/ProfileContext'
import { AuthContext } from '../context/AuthContext'
import { firestore } from '../config/firebase'

const Home = () => {
  const { profile, dispatch } = useContext(ProfileContext)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      const profileRef = doc(firestore, 'profiles', currentUser.uid)
      const listRef = doc(firestore, 'taskLists', currentUser.uid)

      try {
        const profileSnap = await getDoc(profileRef)
        const listSnap = await getDoc(listRef)

        dispatch({
          type: 'SET_PROFILE',
          payload: { id: profileSnap.id, ...profileSnap.data() },
        })
        dispatch({
          type: 'SET_TASK_LIST',
          payload: { id: listSnap.id, ...listSnap.data() },
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (!profile && currentUser.uid) fetchData()
  }, [profile, currentUser.uid, dispatch])

  return (
    <div className='home'>
      <Navbar />
      <main>
        <div className='container'>
          <Aside />
          <Section />
        </div>
      </main>
    </div>
  )
}

export default Home
