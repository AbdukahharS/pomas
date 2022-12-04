import { createContext, useReducer } from 'react'

export const ProfileContext = createContext()

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PPROFILE':
      return action.payload
    case 'REMOVE_PROFILE':
      return null
    default:
      return state
  }
}

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, null)

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}
