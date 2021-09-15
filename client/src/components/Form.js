import React, { forwardRef } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  width: 100%;
`

const StyledFormGroup = styled.div`
  width: 100%;
  margin-bottom: 16px;
  font-size: 18px;
`

const StyledInputGroup = styled.div`
  display: flex;
`

const StyledFormLabel = styled.label`
  display: inline-block;
  padding-left: 0.5em;
  margin-bottom: 8px;
`

const StyledFormInput = styled.input`
  width: 100%;
  border: 1px solid #eee;
  border-radius: 10px;
  font-size: 18px;
  font-family: inherit;
  color: #333;
  padding: 0.5em;
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  background-color: #ffffff;
  border: 2px solid #255c99;
  border-radius: 3px;
  transform: translateY(4px);
  /* ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #255C99;
  } */
  ${Icon} {
    visibility: hidden;
  }
  ${HiddenCheckbox}:checked + & {
    background-color: #255c99;
  }
  ${HiddenCheckbox}:checked + & > ${Icon} {
    visibility: visible;
  }
`

export const Form = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}

export const FormGroup = ({ children, ...props }) => {
  return <StyledFormGroup {...props}>{children}</StyledFormGroup>
}

export const InputGroup = ({children}) => {
  return <StyledInputGroup>{children}</StyledInputGroup>
}

export const FormLabel = ({ children }) => {
  return <StyledFormLabel>{children}</StyledFormLabel>
}

export const FormInput = forwardRef((props, ref) => {
  return <StyledFormInput ref={ref} {...props} />
})

export const FormCheckbox = ({ label, ...props }) => {
  return (
    <CheckboxContainer>
      <label>
        {label}
        <HiddenCheckbox {...props} />
        <StyledCheckbox>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </label>
    </CheckboxContainer>
  )
}
