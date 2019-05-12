import * as React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import { MovieCard } from './components/index'
import Theme from 'Theme'

import { User } from '../../App'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const DownVoteButton = styled(FaArrowCircleLeft)`
    fill: ${Theme.color.primary};
    cursor: pointer;

    &:hover {
        fill: ${Theme.color.hover};
    }
`

const UpVoteButton = styled(FaArrowCircleRight)`
    fill: ${Theme.color.primary};
    cursor: pointer;

    &:hover {
        fill: ${Theme.color.hover};
    }
`

type State = {
    isLoading: boolean
    downVotes: any[]
    upVotes: any[]
    currentItem: any
    areResults: boolean
    queue: number[]
}

type Props = {
    user: User
}

class Rate extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            downVotes: [],
            upVotes: [],
            currentItem: undefined,
            areResults: false,
            queue: []
        }
    }

    componentDidMount() {
        this.getMovieIds()
        this.setupEventListeners()
    }

    getMovieIds = () => {
        const token = sessionStorage.getItem('jwtToken')
        const { queue } = this.state
        axios
            .get(`${__API__}/movies`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log('movies', response.data.movies)
                this.setState({ isLoading: false, areResults: true, queue: [...queue, ...response.data.movies] })
                this.getNextItem()
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
            })
    }

    getNextItem = () => {
        const { queue } = this.state

        if (queue.length > 0) {
            const modifiedQueue = [...queue]
            this.setState({ currentItem: queue[0], queue: modifiedQueue.slice(1) })
        } else {
            this.setState({ areResults: false })
        }
    }

    recordLiked = wasLiked => {
        const { currentItem } = this.state
        const { user } = this.props
        const token = sessionStorage.getItem('jwtToken')
        axios
            .post(
                `${__API__}/like`,
                {
                    user_id: user.id,
                    movie_id: currentItem.id,
                    liked: wasLiked ? 1 : 0
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
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
                <Wrapper>
                    <DownVoteButton size={Theme.icon.size} onClick={() => this.recordLiked(false)}>
                        Down
                    </DownVoteButton>
                    <CardWrapper>
                        <MovieCard id={currentItem.id} />
                    </CardWrapper>
                    <UpVoteButton size={Theme.icon.size} onClick={() => this.recordLiked(true)}>
                        Up
                    </UpVoteButton>
                </Wrapper>
            )
        }

        return content
    }
}

export default Rate
