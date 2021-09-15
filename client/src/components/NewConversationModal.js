import React, { useState } from 'react'
import { Form, FormGroup, FormCheckbox } from './Form'
import Button from './Button'
import { useContacts, useConversations } from '../contexts/contexts'

const NewConversationModal = ({ closeModal }) => {
  const [selectedIds, setSelectedIds] = useState([])
  const { createConversation } = useConversations()
  const { contacts } = useContacts()
  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((prevId) => {
          return id !== prevId
        })
      } else {
        return [...prevSelectedIds, id]
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createConversation(selectedIds)
    closeModal()
  }

  return (
    <div>
      <h2 className="mb">Create New Conversation</h2>
      <Form onSubmit={handleSubmit}>
        {contacts.map((contact) => (
          <FormGroup key={contact.id}>
            {/* <input
              type="checkbox"
              id={contact.id}
              onChange={() => handleCheckboxChange(contact.id)}
              value={selectedIds.includes(contact.id)}
            /> */}
            <FormCheckbox
              label={contact.name}
              id={contact.id}
              onChange={() => handleCheckboxChange(contact.id)}
            />
          </FormGroup>
        ))}
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default NewConversationModal
