import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home, Rate } from './components'

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rate" component={Rate} />
        </Switch>
    )
}

export default App
