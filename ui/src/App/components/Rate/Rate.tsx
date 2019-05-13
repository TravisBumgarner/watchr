import * as React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'

import { MovieCard } from './components/index'
import Theme from 'Theme'

import { User } from '../../App'

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40

const RATING_STEP = 0
const WATCHING_STEP = 1

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${(props: { currentStep: number }) => {
        if (props.currentStep === WATCHING_STEP) {
            return `flex-direction: column`
        } else if (props.currentStep === RATING_STEP) {
            return `flex-direction: row`
        }
    }}
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

const WatchedButton = styled(FaArrowCircleUp)`
    fill: ${Theme.color.primary};
    cursor: pointer;

    &:hover {
        fill: ${Theme.color.hover};
    }
`

const UnwatchedButton = styled(FaArrowCircleDown)`
    fill: ${Theme.color.primary};
    cursor: pointer;

    &:hover {
        fill: ${Theme.color.hover};
    }
`

type Movie = {
    adult: number
    id: string
    original_title: string
    popularity: number
    video: number
}

type State = {
    isLoading: boolean
    currentItem: Movie | undefined
    areResults: boolean
    queue: Movie[]
    currentStep: 0 | 1
    hasWatched: boolean | undefined
}

type Props = {
    user: User
}

class Rate extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            currentItem: undefined,
            areResults: false,
            queue: [],
            currentStep: 1,
            hasWatched: undefined
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

    handleUserLikedInteraction = wasLiked => {
        const { currentItem, hasWatched } = this.state
        const { user } = this.props
        const token = sessionStorage.getItem('jwtToken')

        if (!currentItem || !user) {
            return
        }
        axios
            .post(
                `${__API__}/like`,
                {
                    user_id: user.id,
                    movie_id: currentItem.id,
                    liked: wasLiked ? 1 : 0,
                    watched: hasWatched ? 1 : 0
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(response => {})
            .catch(error => {
                console.log(error)
            })
            .finally(() => this.setState({ currentStep: 1, hasWatched: undefined }))

        this.getNextItem()
    }

    handleUserWatchedInteraction = hasWatched => {
        if (hasWatched) {
            this.setState({ currentStep: RATING_STEP, hasWatched: true })
        } else {
            this.setState({ currentStep: RATING_STEP, hasWatched: false })
        }
    }

    handleKeyDown = event => {
        const key: number = event.keyCode
        if (key === LEFT_ARROW) {
            this.handleUserLikedInteraction(false)
        } else if (key === RIGHT_ARROW) {
            this.handleUserLikedInteraction(true)
        } else if (key === UP_ARROW) {
            this.handleUserWatchedInteraction(true)
        } else if (key === DOWN_ARROW) {
            this.handleUserWatchedInteraction(false)
        }
    }

    setupEventListeners = () => {
        window.addEventListener('keydown', this.handleKeyDown)

        return () => window.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        const { user } = this.props
        const { isLoading, currentItem, areResults, currentStep } = this.state
        if (!user) {
            return <Redirect to="/" />
        }

        let content
        if (isLoading || !currentItem) {
            content = <div>Loading</div>
        } else if (!areResults) {
            content = <div>No results</div>
        } else {
            content = (
                <Wrapper currentStep={currentStep}>
                    {currentStep === WATCHING_STEP ? (
                        <WatchedButton size={Theme.icon.size} onClick={() => this.setState({ hasWatched: true })} />
                    ) : null}
                    {currentStep === RATING_STEP ? (
                        <DownVoteButton size={Theme.icon.size} onClick={() => this.handleUserLikedInteraction(false)} />
                    ) : null}
                    <CardWrapper>
                        <MovieCard id={currentItem.id} />
                    </CardWrapper>
                    {currentStep === WATCHING_STEP ? (
                        <UnwatchedButton size={Theme.icon.size} onClick={() => this.setState({ hasWatched: false })} />
                    ) : null}
                    {currentStep === RATING_STEP ? (
                        <UpVoteButton size={Theme.icon.size} onClick={() => this.handleUserLikedInteraction(true)} />
                    ) : null}
                </Wrapper>
            )
        }

        return content
    }
}

export default Rate
