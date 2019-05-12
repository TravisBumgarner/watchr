import * as React from 'react'
import styled from 'styled-components'

import Theme from 'Theme'

type Props = {
    children: any
    className?: string // TODO: How to not make className optional
    size?: 'large' | 'medium' | 'small'
}

const Text = styled(({ size = 'medium', children, className }: Props) => {
    return <p className={className}>{children}</p>
})`
    font-family: ${Theme.font.body};
    margin: ${Theme.spacing.small} 0;
    line-height: 1.3;
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
    }};
`

export default Text
