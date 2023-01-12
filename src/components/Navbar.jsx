import { useContext } from 'react'
import { ProfileContext } from '../context/ProfileContext'
import Logo from '../images/logo.png'

const Navbar = () => {
  const { profile } = useContext(ProfileContext)

  return (
    <nav>
      <div className='container'>
        <div className='logo'>
          <img src={Logo} alt='Logo' />
          <h1>Pomas</h1>
        </div>
        <div className='details'>
          <p>{profile && profile.name}</p>
          <span>28.11.2022</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
