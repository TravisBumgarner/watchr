import * as React from 'react'
import axios from 'axios'

import { Button, Input } from 'SharedComponents'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = () => {
        axios
            .post(`${__BASE_API_URL__}/login`, {
                password,
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
            Email:
            <Input onChange={setEmail} value={email} />
            Password:
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )
}

export default Login
