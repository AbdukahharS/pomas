// Dependencies
import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
// Pages
import Home from './pages/Home'
import Auth from './pages/Auth'

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/auth' />
    }

    return children
  }

  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
