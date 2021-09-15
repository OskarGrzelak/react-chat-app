import React from 'react'
import Sidebar from './Sidebar'
import ConversationWindow from './ConversationWindow'
import { useConversations } from '../contexts/contexts'
import styled from 'styled-components'

const StyledDashboard = styled.div`
  display: flex;
`

const Dashboard = ({ id }) => {
  const { selectedConversation } = useConversations()
  return (
    <StyledDashboard>
      <Sidebar id={id} />
      {selectedConversation && <ConversationWindow />}
    </StyledDashboard>
  )
}

export default Dashboard
