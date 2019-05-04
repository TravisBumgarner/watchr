import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'

import { Home, Rate, Login, Navigation, Register } from './components'

const App = () => {
    const [user, setUser] = useState({})
    const loadUserFromToken = () => {
        let token = sessionStorage.getItem('jwtToken')

        if (!token || token === '') {
            return
        }
        axios
            .post(`${__API__}/validate_token`, { token })
            .then(response => setUser(response.data.user))
            .catch(error => console.log(error))
    }
    useEffect(loadUserFromToken, [])

    return (
        <>
            <Navigation />
            <div>{user ? `Welcome, ${user.first_name}` : 'Welcome!'}</div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rate" component={Rate} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={() => <div>Not found</div>} />
            </Switch>
        </>
    )
}

export default App
