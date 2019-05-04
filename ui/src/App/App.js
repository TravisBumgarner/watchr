import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Home, Rate, Login, Logout, Navigation, Register } from './components'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => (isAuthenticated === true ? <Component {...rest} /> : <Redirect to="/login" />)}
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
            <Navigation isAuthenticated={isAuthenticated} />
            <div>{user ? `Welcome, ${user.first_name}` : 'Welcome!'}</div>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute isAuthenticated={isAuthenticated} exact user={user} path="/rate" component={Rate} />
                <Route
                    exact
                    path="/login"
                    render={rest => (
                        <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} {...rest} />
                    )}
                />
                <Route
                    exact
                    path="/register"
                    render={rest => (
                        <Register isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} {...rest} />
                    )}
                />
                <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    exact
                    path="/logout"
                    render={rest => (
                        <Logout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} {...rest} />
                    )}
                />
                <Route component={() => <div>Not found</div>} />
            </Switch>
        </>
    )
}

export default App
