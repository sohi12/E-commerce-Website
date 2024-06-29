import Cookies from "js-cookie";
import { createContext, useState } from "react";




export const authContext = createContext()


export default function AuthContextProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!Cookies.get('token'))

    return <authContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        {children}
    </authContext.Provider>
}

