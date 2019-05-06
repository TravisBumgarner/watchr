import * as React from 'react'
import styled from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom'

import Theme from 'Theme'

const Wrapper = styled.nav``

const Link = styled(ReactRouterLink)`
    text-decoration: none;
    color: ${Theme.color.primary};

    &:hover {
        color: ${Theme.color.hover};
    }
`

const ListItem = styled.li`
    margin: 0 20px;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }
`

const List = styled.ul`
    display: flex;
`

const base_links = [{ title: 'Home', route: '/' }, { title: 'About', route: '/about' }]
const anonymous_links = [{ title: 'Login', route: '/login' }, { title: 'Register', route: '/register' }]
const authenticated_links = [
    { title: 'Rate', route: '/rate' },
    { title: 'Friends', route: '/friends' },
    { title: 'Logout', route: '/logout' }
]

const Navigation = ({ isAuthenticated }) => {
    const links = [...base_links, ...(isAuthenticated ? authenticated_links : anonymous_links)]
    const Links = links.map(m => (
        <ListItem key={m.title}>
            <Link to={m.route}>{m.title}</Link>
        </ListItem>
    ))
    return (
        <Wrapper>
            <List>{Links}</List>
        </Wrapper>
    )
}

export default Navigation
