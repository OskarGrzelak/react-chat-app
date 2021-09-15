import React, { useRef } from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.25);
  display: ${(props) => (props.show ? 'block' : 'none')};
`

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.7);
  border-radius: 10px;
  padding: 32px;
`

const Modal = ({ children, show, close }) => {
  const modalRef = useRef()
  const handleClick = (e) => {
    if (e.target === modalRef.current) close()
  }
  return (
    <ModalContainer show={show} onClick={handleClick} ref={modalRef}>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  )
}

export default Modal
