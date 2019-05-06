import * as React from 'react'
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Rate, Login, Logout, Navigation, Register, Friends } from './components/index'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: any) => (
    <Route
        {...rest}
        render={props => (isAuthenticated === true ? <Component {...rest} /> : <Redirect to="/login" />)}
    />
)

const App = () => {
    const [user, setUser] = React.useState<any>(null) //TODO: Fix these
    const [isAuthenticated, setIsAuthenticated] = React.useState<any>(false) //TODO: Fix these
    const [isLoading, setIsLoading] = React.useState<any>(true) //TODO: Fix these

    const loadUserFromToken = () => {
        const token = sessionStorage.getItem('jwtToken')
        if (!token || token === '') {
            setIsLoading(false)
            return
        } else {
            axios
                .post(`${__API__}/validate_token`, { token })
                .then(response => {
                    if (response.data.success) {
                        setUser(response.data.user)
                        setIsAuthenticated(true)
                        console.log('Validate success')
                    } else {
                        console.log('Validate Token failed.')
                    }
                })
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false))
        }
    }
    React.useEffect(loadUserFromToken, [isAuthenticated])

    return (
        <>
            <Navigation isAuthenticated={isAuthenticated} />
            <div>{user ? `Welcome, User` : 'Welcome!'}</div>
            {isLoading ? (
                <div>Loading.......</div>
            ) : (
                <Switch>
                    {/* <Route exact path="/" render={rest => <Home {...rest} />} /> */}
                    <PrivateRoute isAuthenticated={isAuthenticated} exact user={user} path="/rate" component={Rate} />
                    <PrivateRoute
                        user={user}
                        isAuthenticated={isAuthenticated}
                        exact
                        path="/friends"
                        component={Friends}
                    />
                    <Route
                        exact
                        path="/login"
                        render={rest => (
                            <Login
                                isAuthenticated={isAuthenticated}
                                setIsAuthenticated={setIsAuthenticated}
                                {...rest}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/register"
                        render={rest => (
                            <Register
                                isAuthenticated={isAuthenticated}
                                setIsAuthenticated={setIsAuthenticated}
                                {...rest}
                            />
                        )}
                    />
                    <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        exact
                        path="/logout"
                        render={(rest: any) => (
                            <Logout
                                isAuthenticated={isAuthenticated}
                                setIsAuthenticated={setIsAuthenticated}
                                {...rest}
                            />
                        )}
                    />
                    <Route component={() => <div>Not found</div>} />
                </Switch>
            )}
        </>
    )
}

export default App
