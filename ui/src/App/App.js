import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Home, Rate, Login, Navigation, Register } from './components'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)}
    />
)

const App = () => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const loadUserFromToken = () => {
        const token = sessionStorage.getItem('jwtToken')
        if (!token || token === '') {
            return
        } else {
            axios
                .post(`${__API__}/validate_token`, { token })
                .then(response => {
                    if (response.data.success) {
                        setUser(response.data.user)
                        toggleLogin(true)
                        setIsAuthenticated(true)
                    } else {
                        console.log('Validate Token failed.')
                    }
                })
                .catch(error => console.log(error))
        }
    }
    useEffect(loadUserFromToken, [isAuthenticated])

    return (
        <>
            <Navigation />
            <div>{user ? `Welcome, ${user.first_name}` : 'Welcome!'}</div>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/rate" component={Rate} />
                <Route
                    exact
                    path="/login"
                    render={rest => <Login isAuthenticated setIsAuthenticated={setIsAuthenticated} {...rest} />}
                />
                <Route
                    exact
                    path="/register"
                    render={rest => <Register isAuthenticated setIsAuthenticated={setIsAuthenticated} {...rest} />}
                />
                <Route component={() => <div>Not found</div>} />
            </Switch>
        </>
    )
}

export default App
