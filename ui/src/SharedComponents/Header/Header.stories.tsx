import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'

const levelStories = storiesOf('sharedComponents / Header / levels', module)
const LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
LEVELS.forEach(level => levelStories.add(level, () => <Header level={level}>Foo Bar</Header>))
