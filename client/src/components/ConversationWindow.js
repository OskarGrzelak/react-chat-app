import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Form, FormGroup, InputGroup, FormInput } from './Form'
import Button from './Button'
import { useConversations } from '../contexts/contexts'

const StyledConversationWindow = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
`

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: auto;
  padding: 16px;
`

const MessageBox = styled.div`
  align-self: ${props => props.fromMe ? 'flex-end' : 'flex-start'};
  display: flex;
  flex-direction: column;
  align-items: ${props => props.fromMe ? 'flex-end' : 'flex-start'};
  margin: 5px 0;
`

const Message = styled.div`
  background-color: ${props => props.fromMe ? '#255C99' : '#ffffff'};
  color: ${props => props.fromMe ? '#ffffff' : '#255C99'};
  border: 2px solid ${props => props.fromMe ? 'transparent' : '#255C99'};
  padding: 0.5em;
  border-radius: 10px;
`

const MessageAuthor = styled.div`
  color: #ccc;
  font-size: 14px;
`

const ConversationWindow = () => {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({smooth: true})
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(text)
    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text
    )
    setText('')
  }

  return (
    <StyledConversationWindow>
      <Conversation>
        {selectedConversation.messages.map((message, index) => {
          const lastMessage = selectedConversation.messages.length - 1 === index
          return (
            <MessageBox fromMe={message.fromMe} key={index} ref={lastMessage ? setRef : null}>
              <Message fromMe={message.fromMe}>{message.text}</Message>
              <MessageAuthor>{message.fromMe ? 'You' : message.senderName}</MessageAuthor>
            </MessageBox>
          )
        })}
      </Conversation>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormInput
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{resize: 'none'}}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </StyledConversationWindow>
  )
}

export default ConversationWindow
