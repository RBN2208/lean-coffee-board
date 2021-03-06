import styled from 'styled-components/macro'
import Icon from 'supercons'

export default function Card({ authorColor, text, name, onDelete }) {
  return (
    <CardStyled authorColor={authorColor}>
      <TextWrapper>
        {text || <em>No comment</em>}
        <Icon onClick={onDelete} aria-label="delete" glyph="delete" size={24} />
      </TextWrapper>
      <div>{name}</div>
    </CardStyled>
  )
}

const CardStyled = styled.li`
  display: grid;
  align-content: space-between;
  border-radius: 4px;
  padding: 20px 20px 10px 20px;
  background: linear-gradient(#eee, #efefef);

  div {
    text-transform: uppercase;
    font-size: 0.8em;
    text-align: end;
    color: ${props => props.authorColor};
  }
`
const TextWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg:hover {
    height: 28px;
    width: 28px;
    fill: red;
  }
`
