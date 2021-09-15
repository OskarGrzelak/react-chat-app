import React from 'react'
import styled from 'styled-components'
import { useConversations } from '../contexts/contexts'

const ConversationsList = styled.ul`
  height: 100%;
  overflow: auto;
`

const ConversationsItem = styled.li`
  padding: 16px;
  &:not(:first-child) {
    border-top: 1px solid #ccc;
  }
  background-color: ${props => props.active ? '#255C99' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#333333'};
  cursor: pointer;
`

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations()

  return (
    <ConversationsList>
      {conversations.map((conversation, index) => (
        <ConversationsItem key={index} onClick={() => selectConversationIndex(index)} active={conversation.selected}>
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(', ')}
        </ConversationsItem>
      ))}
    </ConversationsList>
  )
}

export default Conversations
