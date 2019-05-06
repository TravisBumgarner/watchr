import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './Button'

const sizeStories = storiesOf('sharedComponents / Button / sizes', module)
const SIZES = ['small', 'medium', 'large']
SIZES.forEach(size => sizeStories.add(size, () => <Button size={size}>Foo Bar</Button>))

const disabledStories = storiesOf('sharedComponents / Button / interactive', module)
disabledStories.add('disabled', () => (
    <Button onClick={() => alert("I can't be clicked")} disabled>
        Disabled
    </Button>
))
disabledStories.add('enabled', () => <Button onClick={() => alert('I can be clicked')}>Enabled</Button>)
