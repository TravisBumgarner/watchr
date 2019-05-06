import * as React from 'react'
import styled from 'styled-components'

import Theme from 'Theme'

const Header = styled(({ level = 'medium', children, className }) => {
    return <p className={className}>{children}</p>
})`
    font-family: ${Theme.font.header};
    ${props => {
        switch (props.level) {
            case 'h1':
                return `font-level: 20px;`
            case 'h2':
                return `font-level: 10px;`
            case 'h3':
                return `font-level: 15px;`
            case 'h4':
                return `font-level: 15px;`
            case 'h5':
                return `font-level: 15px;`
            case 'h6':
                return `font-level: 15px;`
        }
    }};
`

export default Header
