import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = createContext()
const ConversationsContext = createContext()

export const useContacts = () => {
  return useContext(ContactsContext)
}

export const useConversations = () => {
  return useContext(ConversationsContext)
}

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()
  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }
  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations((prevConversations) => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          }
        }
        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text })
    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
      }}
    >
      {children}
    </ConversationsContext.Provider>
  )
}

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false
  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}

const SocketContext = createContext()

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState()
  useEffect(() => {
    const newSocket = io('http://localhost:5000', { query: { id } })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [id])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
