import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import Main from '../components/Main'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div>
        <Aside />
        <Main />
      </div>
    </div>
  )
}

export default Home
