import styled from 'styled-components'

export default function Form({ onSubmitClick }) {
  return (
    <form onSubmit={onSubmitClick}>
      <label>
        <input name="text" placeholder="text" />
      </label>
      <label>
        <input
          disabled
          name="author"
          placeholder="user id"
          value="6040ab0de731cd63443d5606"
        />
      </label>
      <button>create</button>
    </form>
  )
}
