import React from 'react'
import { createGlobalStyle } from 'styled-components'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login'
import Dashboard from './Dashboard'
import {
  ContactsProvider,
  ConversationsProvider,
  SocketProvider,
} from '../contexts/contexts'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd,
  ul {
    margin: 0;
    padding: 0
  }

  ul,
  ol {
    list-style: none;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.4;
    font-family: 'Glory', sans-serif;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
    scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  .mr {
    margin-right: 20px;
  }

  .mb {
    margin-bottom: 20px;
  }

  .m-0 {
    margin: 0;
  }

  .rounded-0 {
    border-radius: 0;
  }
`

const App = () => {
  const [id, setId] = useLocalStorage('id')
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )
  return (
    <>
      <GlobalStyle />
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </>
  )
}

export default App
