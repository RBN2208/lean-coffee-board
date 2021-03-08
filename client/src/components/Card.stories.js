import Card from './Card'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Card',
  component: Card,
}

export const Primary = () => (
  <Card
    authorColor="hotpink"
    text="This is an example"
    name="Rick Sanchez"
    onDelete={action('onDelete')}
  />
)
