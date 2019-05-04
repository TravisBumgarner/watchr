import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home, Rate, Login, Navigation, Register } from './components'

const App = () => {
    return (
        <>
            <Navigation />
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
