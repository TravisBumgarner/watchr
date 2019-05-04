import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'

import { Home, Rate, Login, Navigation, Register } from './components'

const App = () => {
    const [user, setUser] = useState(null)
    const [login, toggleLogin] = useState(false)
    const loadUserFromToken = () => {
        const token = sessionStorage.getItem('jwtToken')
        console.log('token', token)
        if (!token || token === '' || typeof token === 'undefined') {
            console.log('i return')
            return
        } else {
            axios
                .post(`${__API__}/validate_token`, { token })
                .then(response => {
                    setUser(response.data.user)
                    toggleLogin(true)
                })
                .catch(error => console.log(error))
        }
    }
    useEffect(loadUserFromToken, [login])

    return (
        <>
            <Navigation />
            <div>{user ? `Welcome, ${user.first_name}` : 'Welcome!'}</div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/rate" component={Rate} />
                <Route exact path="/login" render={rest => <Login toggleLogin={toggleLogin} {...rest} />} />
                <Route exact path="/register" render={rest => <Register toggleLogin={toggleLogin} {...rest} />} />
                <Route component={() => <div>Not found</div>} />
            </Switch>
        </>
    )
}

export default App
