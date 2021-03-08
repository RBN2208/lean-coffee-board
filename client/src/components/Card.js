import styled from 'styled-components/macro'
import Icon from 'supercons'
import PropTypes from 'prop-types'

export default function Card({
  authorColor = 'hotpink',
  text = <em>No comment</em>,
  name = 'Anonymous',
  votes = 0,
  onDelete,
  onVote,
}) {
  const voteThreshold = votes > 99 ? '99+' : votes

  return (
    <CardStyled authorColor={authorColor}>
      <div>{name}</div>
      {text}
      <IconWrapper>
        <Icon onClick={onDelete} role="button" glyph="delete" size={24} />
        <VoteCircle onClick={onVote}>{votes ? voteThreshold : '+'}</VoteCircle>
      </IconWrapper>
    </CardStyled>
  )
}

Card.propTypes = {
  authorColor: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  votes: PropTypes.number,
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
    color: ${props => props.authorColor};
  }
`
const IconWrapper = styled.span`
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

const VoteCircle = styled.button.attrs(props => ({ 'aria-label': 'vote' }))`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
`
