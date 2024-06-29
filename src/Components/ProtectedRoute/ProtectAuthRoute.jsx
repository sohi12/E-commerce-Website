import React, { useContext } from 'react'
import { authContext } from '../../Contexts/authContext'
import Home from '../Home/Home'
import { Navigate } from 'react-router-dom'

export default function ProtectAuthRoute({ children }) {
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext)

    return (
        <>
            {!isUserLoggedIn ? children : <Navigate to={'/home'} />}
        </>
    )
}
