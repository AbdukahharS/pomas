import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import Section from '../components/Section'

const Home = () => {
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
