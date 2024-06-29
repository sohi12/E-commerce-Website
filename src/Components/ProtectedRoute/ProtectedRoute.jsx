import React, { useContext } from 'react'
import { authContext } from '../../Contexts/authContext'
import Login from '../Login/Login'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext)

    return (
        <>
            {isUserLoggedIn ? children : <Login/>}
        </>
    )
}
