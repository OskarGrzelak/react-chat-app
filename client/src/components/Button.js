import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => (props.secondary ? '#a1a1a1' : '#255C99')};
  padding: 1em;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
  cursor: pointer;
`

const Button = ({ children, onClick, secondary, className }) => {
  return (
    <StyledButton onClick={onClick} secondary={secondary} className={className}>
      {children}
    </StyledButton>
  )
}

export default Button
