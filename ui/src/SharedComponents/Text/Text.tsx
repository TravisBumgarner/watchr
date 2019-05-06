import * as React from 'react'
import styled from 'styled-components'

import Theme from 'Theme'

type Props = {
    className: 'string'
    children: any
    size: 'large' | 'medium' | 'small'
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
            case 'medium':
                return `font-size: 15px;`
            case 'small':
                return `font-size: 10px;`
        }
    }};
`

export default Text
