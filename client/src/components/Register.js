import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getRandomName from '../services/getRandomName'
import Button from './Button'

export default function Register({ onRegister }) {
  const [randomName, setRandomName] = useState('')

  useEffect(() => {
    getRandomName()
      .then(setRandomName)
      .catch(() => {})
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Choose a name:
        <input name="username" placeholder={randomName} />
      </label>
      <label>
        Your email:
        <input name="email" type="email" placeholder="john@doe.com" />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          placeholder="Needs one uppercase letter"
        />
      </label>

      <Button>Register!</Button>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const { username, email, password } = event.target.elements
    onRegister({
      username: username.value || randomName,
      email: email.value,
      password: password.value,
    })
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
