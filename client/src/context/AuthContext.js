import { createContext, useReducer, useEffect, useState } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    )
    
    const toggle = () => {
        setDarkMode(!darkMode)
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
        localStorage.setItem("darkMode", darkMode)
      },[state.user, darkMode])

    return (
        <AuthContext.Provider value={{user:state.user, isFetching: state.isFetching, error: state.error, dispatch, darkMode, toggle }}>
            {children}
        </AuthContext.Provider>
    )
}