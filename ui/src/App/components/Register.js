import * as React from 'react'
import axios from 'axios'

import { Button, Input } from 'SharedComponents'

const Register = () => {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = () => {
        axios
            .post(`${__API__}/register`, {
                password,
                first_name: firstName,
                last_name: lastName,
                email
            })
            .then(() => {
                setFirstName('')
                setLastName('')
                setEmail('')
                setPassword('')
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
