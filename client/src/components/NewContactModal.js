import React, { useRef } from 'react'
import { Form, FormGroup, FormLabel, FormInput } from './Form'
import Button from './Button'
import { useContacts } from '../contexts/contexts'

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()
  const handleSubmit = (e) => {
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }

  return (
    <div>
      <h2 className="mb">Create New Contact</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Id</FormLabel>
          <FormInput type="text" ref={idRef} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormInput type="text" ref={nameRef} />
        </FormGroup>
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default NewContactModal
