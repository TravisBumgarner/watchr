import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { MovieCard } from './components/index'
import { Queue } from 'Utilities'

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
`

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
// Next line Figure out next line
class Rate extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            downVotes: [],
            upVotes: [],
            currentItem: undefined,
            areResults: false
        }
        this.queue = new Queue() //TODO: What to do with this line
    }

    componentDidMount() {
        this.getMovieIds()
        this.setupEventListeners()
    }

    getMovieIds = () => {
        axios
            .get(`${__API__}/movies`)
            .then(response => {
                console.log('movies', response.data.movies)
                this.setState({ isLoading: false, areResults: true })
                this.queue.addArray(response.data.movies)
                this.getNextItem()
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
            })
    }

    getNextItem = () => {
        console.log(this.queue.size(), 'queue')
        if (this.queue.size() > 0) {
            this.setState({ currentItem: this.queue.last() })
            this.queue.remove()
        } else {
            this.setState({ areResults: false })
        }
    }

    recordLiked = wasLiked => {
        const { currentItem } = this.state
        const { user } = this.props

        axios
            .post(`${__API__}/like`, {
                user_id: user.id,
                movie_id: currentItem.id,
                liked: wasLiked ? 1 : 0
            })
            .then(response => {})
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
            })
        console.log()

        this.getNextItem()
    }

    handleKeyDown = event => {
        const LEFT_ARROW = '37'
        const RIGHT_ARROW = '39'
        if (event.keyCode == LEFT_ARROW) {
            this.recordLiked(true)
        } else if (event.keyCode == RIGHT_ARROW) {
            this.recordLiked(false)
        }
    }

    setupEventListeners = () => {
        window.addEventListener('keydown', this.handleKeyDown)

        return () => window.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        const { isLoading, currentItem, areResults } = this.state
        let content

        if (isLoading || !currentItem) {
            content = <div>Loading</div>
        } else if (!areResults) {
            content = <div>No results</div>
        } else {
            content = (
                <div>
                    <DownVoteButton onClick={() => this.recordLiked(false)}>Down</DownVoteButton>
                    <UpVoteButton onClick={() => this.recordLiked(true)}>Up</UpVoteButton>
                    <CardWrapper>
                        <MovieCard id={currentItem.id} />
                    </CardWrapper>
                </div>
            )
        }

        return content
    }
}

export default Rate
