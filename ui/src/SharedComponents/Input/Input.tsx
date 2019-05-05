import * as React from 'react'
import styled from 'styled-components'

const Input = styled(({ onChange, ...rest }) => {
    return <input onChange={event => onChange(event.target.value)} {...rest} />
})``

export default Input
