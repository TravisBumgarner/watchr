import * as React from 'react'
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { Home, About, Rate, Login, Logout, Navigation, Register, Friends, Identity } from './components/index'
import Theme, { GlobalStyle } from 'Theme'

type User = {
    id: string
    first_name: string
} | null

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: any) => (
    <Route
        {...rest}
        render={props => (isAuthenticated === true ? <Component {...rest} /> : <Redirect to="/login" />)}
    />
)

const WRAPPER_WIDTH = '96vw' // in vw
const WRAPPER_HEIGHT = '96vh' // in vh

const Wrapper = styled.div`
    width: ${WRAPPER_WIDTH};
    height: ${WRAPPER_HEIGHT};
    margin: 2vh 2vw;
`

const HeaderWrapper = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${Theme.border.thickness} solid ${Theme.color.primary};
`

const BodyWrapper = styled.main`
    width: 100%;
    height: calc(${WRAPPER_HEIGHT} - 50px);
`

const App = () => {
    const [user, setUser] = React.useState<User>(null)
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

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
            <GlobalStyle />
            <Wrapper>
                <HeaderWrapper>
                    <Identity />
                    <Navigation isAuthenticated={isAuthenticated} />
                </HeaderWrapper>
                <BodyWrapper>
                    {isLoading ? (
                        <div>Loading.......</div>
                    ) : (
                        <Switch>
                            <Route exact path="/" render={rest => <Home {...rest} />} />
                            <Route exact path="/about" render={rest => <About {...rest} />} />
                            <PrivateRoute
                                isAuthenticated={isAuthenticated}
                                exact
                                user={user}
                                path="/rate"
                                component={Rate}
                            />
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
                                setIsAuthenticated={setIsAuthenticated}
                                isAuthenticated={isAuthenticated}
                                exact
                                path="/logout"
                                component={Logout}
                            />
                            <Route component={() => <div>Not found</div>} />
                        </Switch>
                    )}
                </BodyWrapper>
            </Wrapper>
        </>
    )
}

export { User }
export default App
