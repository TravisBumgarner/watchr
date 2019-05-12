import * as React from 'react'
import styled from 'styled-components'

import Theme from 'Theme'

type Props = {
    children: any
    className?: string //TODO: How to not make className optional
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Header = styled(({ children, className }: Props) => {
    return <p className={className}>{children}</p>
})`
    font-family: ${Theme.font.header};
    ${props => {
        switch (props.level) {
            case 'h1':
                return `
                    font-size: 24px;
                    margin: ${Theme.spacing.large} 0;
                    font-weight: 700;
                `
            case 'h2':
                return `
                    font-size: 20px;
                    margin: ${Theme.spacing.large} 0;
                    font-weight: 700;
        `
            case 'h3':
                return `
                    font-size: 16px;
                    margin: ${Theme.spacing.medium} 0;
                    font-weight: 700;
        `
            case 'h4':
                return `
                    font-size: 16px;
                    margin: ${Theme.spacing.medium} 0;
                    font-weight: 700;
            `
            case 'h5':
                return `
                    font-size: 16px;
                    margin: ${Theme.spacing.small} 0;
                    font-weight: 700;
                `
            case 'h6':
                return `
                    font-size: 16px;
                    margin: ${Theme.spacing.small} 0;
                    font-weight: 700;
                `
        }
    }};
`

export default Header
