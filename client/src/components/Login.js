import React, { useRef } from 'react'
import styled from 'styled-components'
import { v4 as uuidV4 } from 'uuid'
import { Form, FormGroup, FormLabel, FormInput } from './Form'
import Button from './Button'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 16px;
`

const Login = ({ onIdSubmit }) => {
  const idRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    onIdSubmit(idRef.current.value)
  }
  const createNewId = (e) => {
    e.preventDefault()
    onIdSubmit(uuidV4())
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Enter Id</FormLabel>
          <FormInput type="text" ref={idRef} />
        </FormGroup>
        <Button type="submit" className="mr">
          Login
        </Button>
        <Button secondary onClick={createNewId}>
          Create new id
        </Button>
      </Form>
    </Container>
  )
}

export default Login
