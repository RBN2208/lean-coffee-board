import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'
describe('Card', () => {
  const deleteCallback = jest.fn()
  const voteCallback = jest.fn()

  beforeEach(() => {
    deleteCallback.mockClear()
    voteCallback.mockClear()
  })

  it('renders name, text and two buttons', () => {
    render(
      <Card
        name="Rick"
        text="Example"
        onDelete={deleteCallback}
        onVote={voteCallback}
      />
    )
    expect(screen.getByText('Rick')).toBeInTheDocument()
    expect(screen.getByText('Example')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('shows default values for name, text and authorColor', () => {
    render(<Card onDelete={deleteCallback} onVote={voteCallback} />)
    expect(screen.getByText('Anonymous')).toBeInTheDocument()
    expect(screen.getByText('No comment')).toBeInTheDocument()
    const { color } = getComputedStyle(screen.getByText('Anonymous'))
    expect(color).toBe('hotpink')
  })

  it('calls onDelete when clicking on the button', () => {
    render(<Card onDelete={deleteCallback} onVote={voteCallback} />)
    const button = screen.getByRole('button', { name: 'delete' })
    userEvent.click(button)
    expect(deleteCallback).toHaveBeenCalled()
  })

  it('calls onVote when clicking on the button', () => {
    render(<Card onDelete={deleteCallback} onVote={voteCallback} />)
    const button = screen.getByRole('button', { name: 'vote' })
    userEvent.click(button)
    expect(voteCallback).toHaveBeenCalled()
  })

  it('shows number of votes in the voting-button or `+`', () => {
    const { rerender } = render(
      <Card votes={0} onDelete={deleteCallback} onVote={voteCallback} />
    )

    const button = screen.getByRole('button', { name: 'vote' })
    expect(button).toHaveTextContent('+')

    rerender(<Card votes={3} onDelete={deleteCallback} onVote={voteCallback} />)
    expect(button).toHaveTextContent('3')
  })

  it('shows 99+ for more than 99 votes', () => {
    render(<Card votes={100} onDelete={deleteCallback} onVote={voteCallback} />)
    const button = screen.getByRole('button', { name: 'vote' })
    expect(button).toHaveTextContent('99+')
  })
})
