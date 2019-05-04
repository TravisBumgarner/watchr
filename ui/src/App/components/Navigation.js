import React from 'react'
import { Link } from 'react-router-dom'

const base_links = [{ title: 'Home', route: '/' }]
const anonymous_links = [{ title: 'Login', route: '/login' }, { title: 'Register', route: '/register' }]
const private_links = [{ title: 'Rate', route: '/rate' }, { title: 'Logout', route: '/logout' }]

const Navigation = ({ isAuthenticated }) => {
    const links = [...base_links, ...(isAuthenticated ? private_links : anonymous_links)]
    const Links = links.map(m => <Link to={m.route}>{m.title}</Link>)
    return <div>{Links}</div>
}

export default Navigation
