import * as React from 'react'

import { Button } from 'SharedComponents'

const Logout = ({ setIsAuthenticated }) => {
    const handleLogout = () => {
        sessionStorage.setItem('jwtToken', '')
        setIsAuthenticated(false)
    }

    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Logout
