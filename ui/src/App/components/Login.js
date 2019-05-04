import * as React from 'react'
import axios from 'axios'

import { Button, Input } from 'SharedComponents'

const Login = () => {
    const [email, setEmail] = React.useState('travis-bumgarner@pluralsight.com')
    const [password, setPassword] = React.useState('hello123')

    const handleSubmit = () => {
        axios
            .post(
                `${__API__}/login`,
                {
                    password,
                    email
                },
                { withCredentials: true }
            )
            .then(() => {
                setEmail('')
                setPassword('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            Email:
            <Input type="email" onChange={setEmail} value={email} />
            Password:
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )
}

export default Login
