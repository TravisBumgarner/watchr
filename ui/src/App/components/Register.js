import * as React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { Button, Input } from 'SharedComponents'

const Register = ({ isAuthenticated, setIsAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    const [firstName, setFirstName] = React.useState('f')
    const [lastName, setLastName] = React.useState('f')
    const [email, setEmail] = React.useState('f@f.com')
    const [password, setPassword] = React.useState('f')

    const handleSubmit = () => {
        axios
            .post(`${__API__}/register`, {
                password,
                email,
                first_name: firstName,
                last_name: lastName
            })
            .then(response => {
                if (response.data.success) {
                    sessionStorage.setItem('jwtToken', response.data.token)
                    setIsAuthenticated(true)
                    setEmail('')
                    setPassword('')
                    setFirstName('')
                    setLastName('')
                } else {
                    console.log('Registration failed.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            First Name:
            <Input onChange={setFirstName} value={firstName} />
            Last Name:
            <Input onChange={setLastName} value={lastName} />
            Email:
            <Input onChange={setEmail} value={email} />
            Password:
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Register</Button>
        </div>
    )
}

export default Register
