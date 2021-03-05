import styled from 'styled-components/macro'

export default function Form({ onSubmitClick }) {
  return (
    <FormContainer onSubmit={onSubmitClick}>
      <label>
        <input name="text" placeholder="text" />
      </label>
      <label>
        <input
          disabled
          hidden
          name="author"
          placeholder="user id"
          value="6040ab0de731cd63443d5606"
        />
      </label>
      <button>create</button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  gap: 20px;
  padding: 15px;
  background-color: darkgrey;
  input {
    padding: 10px;
    width: 700px;
  }
`
