import { createContext, useReducer } from 'react'

export const ProfileContext = createContext()

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { profile: action.payload, taskList: state.taskList }
    case 'SET_TASK_LIST':
      return { profile: state.profile, taskList: action.payload }
    case 'REMOVE_PROFILE':
      return { profile: null, taskList: null }
    default:
      return state
  }
}

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, {
    profile: null,
    taskList: [],
  })

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}
