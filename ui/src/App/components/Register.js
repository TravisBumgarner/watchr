import * as React from 'react'
import axios from 'axios'

import { Button, Input } from 'SharedComponents'

const Register = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = () => {
        axios
            .post(`${__BASE_API_URL__}/register`, {
                password,
                username
            })
            .then(() => {
                setUsername('')
                setPassword('')
            })
    }

    return (
        <div>
            <Input onChange={setUsername} value={username} />
            <Input type="password" onChange={setPassword} value={password} />
            <Button onClick={handleSubmit}>Register</Button>
        </div>
    )
}

export default Register
