import * as React from 'react'
import { Redirect } from 'react-router-dom'

import { Button } from 'SharedComponents'

const Logout = ({ isAuthenticated, setIsAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to="/" />
    }

    const handleLogout = () => {
        sessionStorage.setItem('jwtToken', '')
    }

    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Logout
