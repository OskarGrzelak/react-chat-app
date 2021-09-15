import React, { useState } from 'react'
import styled from 'styled-components'
import Conversations from './Conversations'
import Contacts from './Contacts'
import Modal from './Modal'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'
import Button from './Button'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

const StyledSidebar = styled.div`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Nav = styled.nav`
  display: flex;
  font-size: 18px;
  justify-content: center;
  border-bottom: 1px solid #ccc;
`

const NavItem = styled.span`
  display: block;
  padding: 0.5em 0.8em;
  margin-bottom: -1px;
  background-color: #fff;
  color: ${(props) => (props.active ? '#333' : '#255C99')};
  border: 1px solid;
  border-color: ${(props) =>
    props.active ? '#ccc #ccc #fff' : 'transparent transparent #ccc'};
  cursor: pointer;
`

const TabContent = styled.div`
  border-right: 1px solid #ccc;
  flex-grow: 1;
  overflow: hidden;
`

const IdInfo = styled.div`
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 16px;
  font-size: 10px;
`

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const handleNav = (e) => {
    setActiveKey(e.target.id)
  }
  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const renderSwitch = (param) => {
    switch (param) {
      case CONVERSATIONS_KEY:
        return <Conversations />
      case CONTACTS_KEY:
        return <Contacts />
      default:
        return 'ERROR'
    }
  }

  return (
    <StyledSidebar>
      <Nav>
        <NavItem
          id={CONVERSATIONS_KEY}
          onClick={handleNav}
          active={activeKey === CONVERSATIONS_KEY}
        >
          Conversations
        </NavItem>
        <NavItem
          id={CONTACTS_KEY}
          onClick={handleNav}
          active={activeKey === CONTACTS_KEY}
        >
          Contacts
        </NavItem>
      </Nav>
      <TabContent>{renderSwitch(activeKey)}</TabContent>
      <IdInfo>
        Your Id: <span>{id}</span>
      </IdInfo>
      <Button onClick={openModal} className="rounded-0">
        New {activeKey === 'conversations' ? 'Conversation' : 'Contact'}
      </Button>
      <Modal show={modalOpen} close={closeModal}>
        {activeKey === 'conversations' ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </StyledSidebar>
  )
}

export default Sidebar
