import React from 'react'
import styled from 'styled-components'

const Input = styled(({ onChange, ...rest }) => {
    return <input onChange={() => onChange(event.target.value)} {...rest} />
})``

export default Input
