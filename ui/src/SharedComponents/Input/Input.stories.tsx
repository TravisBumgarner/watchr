import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Input from './Input'

const baseStories = storiesOf('sharedComponents / Input', module)
baseStories.add('entered text', () => <Input value={'hello'} />)
baseStories.add('empty text', () => <Input value={''} />)
