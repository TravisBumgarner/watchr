import * as React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'SharedComponents'

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    const [username, setUsername] = React.useState<any>('') //TODO: Fix this.
    const [password, setPassword] = React.useState<any>('') //TODO: Fix this.

    const handleSubmit = () => {
        axios
            .post(`${__API__}/login`, {
                password,
                username
            })
            .then(response => {
                if (response.data.success) {
                    sessionStorage.setItem('jwtToken', response.data.token)
                    setIsAuthenticated(true)
                    setUsername('')
                    setPassword('')
                } else {
                    console.log('something went wrong with login')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            username:
            <Input type="text" onChange={setUsername} value={username} />
            Password:
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )
}

export default Login
