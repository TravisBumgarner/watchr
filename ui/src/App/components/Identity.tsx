import * as React from 'react'
import styled from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom'

import Theme from 'Theme'

const Wrapper = styled.div``

const Link = styled(ReactRouterLink)`
    text-decoration: none;
    color: ${Theme.color.primary};

    &:hover {
        color: ${Theme.color.hover};
    }
`

const Identity = () => {
    return (
        <Wrapper>
            <Link to="/">Watchr</Link>
        </Wrapper>
    )
}

export default Identity
