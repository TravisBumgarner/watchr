import React from 'react'
import styled from 'styled-components'

const Text = styled(({ size = 'medium', children, className }) => {
    return <p className={className}>{children}</p>
})`
    ${props => {
        switch (props.size) {
            case 'large':
                return `font-size: 20px;`
            case 'small':
                return `font-size: 10px;`
            case 'medium':
            default:
                return `font-size: 15px;`
        }
    }}
`

export default Text
