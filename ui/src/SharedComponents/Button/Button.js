import React from 'react'
import styled from 'styled-components'

const Button = styled(({ onClick, disabled, size = 'medium', children, className }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={className}>
            {children}
        </button>
    )
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
