import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import createUser from '../services/createUser'
import loginUser from '../services/loginUser'
import postUser from '../services/loginUser'
import Board from './Board'
import Button from './Button'
import Login from './Login'
import Register from './Register'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(loadFromLocal('jwt'))
  const [error, setError] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    saveToLocal('token', token)
  }, [token])

  return (
    error || (
      <Grid loggedOut={!user}>
        {user ? (
          <Board user={user} token={token} onLogout={handleLogout} />
        ) : (
          <>
            {isRegistered ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Register onRegister={handleRegister} />
            )}

            <LinkButton onClick={() => setIsRegistered(!isRegistered)}>
              {isRegistered ? 'Or register' : 'Or login'}
            </LinkButton>
          </>
        )}
      </Grid>
    )
  )

  function handleLogout() {
    setUser(null)
    setToken(null)
  }

  function handleRegister(user) {
    createUser(user).then(setCredentials).catch(setError)
  }

  function handleLogin(user) {
    loginUser(user).then(setCredentials).catch(setError)
  }

  function setCredentials({ jwt, user }) {
    setUser(user)
    setToken(jwt)
  }
}

const LinkButton = styled.button`
  border: none;
  padding: none;
  background: none;
  display: inline;
  text-decoration: underline;
  cursor: pointer;
`

const Grid = styled.div`
  display: grid;
  ${props => props.loggedOut && 'place-items: center'};
  height: 100vh;
`

export default App
