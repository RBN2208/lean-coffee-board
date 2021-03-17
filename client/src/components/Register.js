import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getRandomName from '../services/getRandomName'
import validateUser from '../services/validation'
import Button from './Button'

export default function Register({ onRegister }) {
  const [error, setError] = useState(false)
  const [randomName, setRandomName] = useState('')
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    getRandomName()
      .then(setRandomName)
      .catch(() => {})
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Choose a name:
        <input
          onChange={handleChange}
          value={user.username}
          name="username"
          placeholder={randomName}
        />
      </label>
      <label>
        Your email:
        <input
          onChange={handleChange}
          name="email"
          type="email"
          value={user.email}
          placeholder={`${randomName}@coffee.de`}
        />
      </label>
      <label>
        A password:
        <input
          onChange={handleChange}
          value={user.password}
          name="password"
          type="password"
          placeholder="..."
        />
      </label>
      {error && <small>Please fill out the form correctly</small>}
      <Button>Register!</Button>
    </Form>
  )

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    setUser({ ...user, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (validateUser(user)) {
      onRegister(user)
    } else {
      setError(true)
    }
  }
}

const Form = styled.form`
  display: grid;
  gap: 20px;
  padding: 40px;
  border-radius: 12px;
  border: 2px dashed plum;
  box-shadow: 0 4px 8px #0003;
  max-width: 360px;
  width: 100%;

  label {
    display: grid;
    gap: 10px;
  }

  input {
    width: 100%;
  }
`
