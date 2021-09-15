import React from 'react'
import styled from 'styled-components'
import { useContacts } from '../contexts/contexts'

const ContactsList = styled.ul`
  height: 100%;
  overflow: auto;
`

const ContactsItem = styled.li`
  padding: 16px;
  &:not(:first-child) {
    border-top: 1px solid #ccc;
  }
`

const Contacts = () => {
  const { contacts } = useContacts()
  return (
    <ContactsList>
      {contacts.map((contact) => (
        <ContactsItem key={contact.id}>{contact.name}</ContactsItem>
      ))}
    </ContactsList>
  )
}

export default Contacts
