import * as React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'SharedComponents'

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [loginFailed, setLoginFailed] = React.useState<boolean>(false)
    const [loginFailedMessage, setLoginFailedMessage] = React.useState<string>('')

    const handleSubmit = () => {
        loginFailed && setLoginFailed(false)
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
                    setLoginFailed(false)
                } else {
                    setLoginFailed(true)
                    setLoginFailedMessage(response.data.message)
                }
            })
            .catch(error => {
                setLoginFailed(true)
                setLoginFailedMessage('Something went wrong.')
            })
    }

    return (
        <div>
            {loginFailed ? <p>{loginFailedMessage}</p> : ''}
            Username:
            <Input type="text" onChange={setUsername} value={username} />
            Password:
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )
}

export default Login
