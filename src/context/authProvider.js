import { createContext, useEffect, useState} from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [persist, setPersist] =
        useState(JSON.parse(localStorage.getItem("persist") || false))

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext