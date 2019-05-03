import React from 'react'
import { Link } from 'react-router-dom'

const links = [
    { title: 'Home', route: '/' },
    { title: 'Login', route: '/login' },
    { title: 'Register', route: '/register' }
]

const Links = links.map(m => <Link to={m.route}>{m.title}</Link>)

const Navigation = () => {
    return <div>{Links}</div>
}

export default Navigation
