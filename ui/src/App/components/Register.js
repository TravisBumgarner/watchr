import * as React from 'react'
import axios from 'axios'

import { Button, Input } from 'SharedComponents'

const Register = ({ toggleLogin }) => {
    const [firstName, setFirstName] = React.useState('f')
    const [lastName, setLastName] = React.useState('f')
    const [email, setEmail] = React.useState('f@f.com')
    const [password, setPassword] = React.useState('f')

    const handleSubmit = () => {
        axios
            .post(`${__API__}/Register`, {
                password,
                email
            })
            .then(response => {
                sessionStorage.setItem('jwtToken', response.data.token)
                toggleLogin(true)
                setEmail('')
                setPassword('')
                setFirstName('')
                setLastName('')
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
