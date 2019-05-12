import * as React from 'react'
import styled from 'styled-components'

import Theme from 'Theme'

type Props = {
    children: any
    size: 'large' | 'medium' | 'small' | undefined
}

const Text = styled(({ size = 'medium', children }: Props) => {
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
