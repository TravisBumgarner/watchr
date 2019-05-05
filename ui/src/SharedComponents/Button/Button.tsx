import * as React from 'react'
import styled from 'styled-components'

const Button = styled(({ children, ...rest }) => {
    return <button {...rest}>{children}</button>
})`
    ${props => {
        switch (props.size) {
            case 'large':
                return `height: 20px;`
            case 'small':
                return `height: 10px;`
            case 'medium':
            default:
                return `height: 15px;`
        }
    }}
`

export default Button
