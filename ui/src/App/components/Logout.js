import * as React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'SharedComponents'

const Logout = ({ isAuthenticated, setIsAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to="/" />
    }

    const handleLogout = () => {
        sessionStorage.setItem('jwtToken', response.data.token)
    }

    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Logout
