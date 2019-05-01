import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const contentQueue = ['red', 'blue', 'yellow', 'green']

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

const Card = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.color};
`

const Rate = () => {
    const [downVotes, setDownVotes] = useState([])
    const [upVotes, setUpVotes] = useState([])
    const [currentItem, setCurrentItem] = useState()

    const announceResults = () => {
        if (contentQueue.length === 0 && typeof currentItem === 'undefined') {
            alert(`You like ${upVotes.join(', ')} and you don't like ${downVotes.join(', ')}`)
        }
    }
    useEffect(announceResults, [currentItem])

    const handleKeyDown = event => {
        const LEFT_ARROW = '37'
        const RIGHT_ARROW = '39'
        if (event.keyCode == LEFT_ARROW) {
            handleDownVote()
        } else if (event.keyCode == RIGHT_ARROW) {
            handleUpVote()
        }
    }

    const setupEventListeners = () => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }
    useEffect(setupEventListeners, [])

    const componentDidMount = () => {
        getNextItem()
    }
    useEffect(componentDidMount, [])

    const getNextItem = () => {
        setCurrentItem(contentQueue.pop())
    }

    const handleDownVote = () => {
        const modifiedDownVotes = [...downVotes, currentItem]
        setDownVotes(modifiedDownVotes)
        getNextItem()
    }

    const handleUpVote = () => {
        const modifiedUpVotes = [...upVotes, currentItem]
        console.log(upVotes, currentItem)
        setUpVotes(modifiedUpVotes)
        getNextItem()
    }

    return (
        <div>
            <DownVoteButton onClick={handleDownVote}>Down</DownVoteButton>
            <UpVoteButton onClick={handleUpVote}>Up</UpVoteButton>
            <Card color={currentItem} />
        </div>
    )
}

export default Rate
