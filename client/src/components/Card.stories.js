import Card from './Card'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    authorColor: { control: 'color' },
  },
}

const Template = args => <Card {...args} />

export const Primary = Template.bind({})

Primary.args = {
  authorColor: 'hotpink',
  text: 'This is an example',
  name: 'Rick Sanchez',
  onDelete: action('onDelete'),
}
