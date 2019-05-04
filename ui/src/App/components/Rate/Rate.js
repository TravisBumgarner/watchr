import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Card } from './components'
import config from 'config'
import { Queue } from 'utilities'

const DownVoteButton = styled.button`
    position: fixed;
    left: 5px;
    top: 50vh;
`

const UpVoteButton = styled.button`
    position: fixed;
    right: 5px;
    top: 50vh;
`

class Rate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            downVotes: [],
            upVotes: [],
            nextItem: { original_title: 'initialload' },
            areResults: false
        }
        this.queue = new Queue()
    }

    componentDidMount() {
        this.getMovieIds()
        this.setupEventListeners()
    }

    getMovieIds = () => {
        axios
            .get(`${__API__}/movies`)
            .then(response => {
                this.setState({ isLoading: false, areResults: true })
                this.queue.addArray(response.data.data)
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
            })
    }

    getNextItem = () => {
        console.log(this.queue.size(), 'queue')
        if (this.queue.size() > 0) {
            this.setState({ nextItem: this.queue.last() })
            this.queue.remove()
        } else {
            this.setState({ areResults: false })
        }
    }

    handleKeyDown = event => {
        const LEFT_ARROW = '37'
        const RIGHT_ARROW = '39'
        if (event.keyCode == LEFT_ARROW) {
            console.log('downvote')
        } else if (event.keyCode == RIGHT_ARROW) {
            console.log('upvote')
            this.getNextItem()
        }
    }

    setupEventListeners = () => {
        window.addEventListener('keydown', this.handleKeyDown)

        return () => window.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        const { isLoading, nextItem, areResults } = this.state
        let content

        if (isLoading) {
            content = <div>Loading</div>
        } else if (!areResults) {
            content = <div>No results</div>
        } else {
            content = (
                <div>
                    <DownVoteButton onClick={() => console.log('boo')}>Down</DownVoteButton>
                    <UpVoteButton onClick={() => console.log('yay')}>Up</UpVoteButton>
                    <Card>{nextItem.original_title}</Card>
                </div>
            )
        }

        return content
    }
}

export default Rate
