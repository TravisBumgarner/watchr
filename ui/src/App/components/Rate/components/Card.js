import React from 'react'
import styled from 'styled-components'

const Card = styled(({ className, children }) => {
    return <div className={className}>{children}</div>
})`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.color};
`

export default Card
