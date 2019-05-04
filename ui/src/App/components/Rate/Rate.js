import React, { useState, useEffect } from 'react'
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

const queue = new Queue()

const Rate = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [downVotes, setDownVotes] = useState([])
    const [upVotes, setUpVotes] = useState([])
    const [nextItem, setNextItem] = useState({ original_title: 'initialload' })

    const getMovieIds = () => {
        axios
            .get(`${__API__}/movies`)
            .then(response => {
                queue.addArray(response.data.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false)
            })
    }
    useEffect(getMovieIds, [])

    const getNextItem = () => {
        console.log('i happen', isLoading)
        if (isLoading) {
            return
        }
        console.log('then I do')
        const item = queue.first()
        queue.remove()
        console.log(item)
        console.log('getNextItem', item)
        setNextItem(item)
    }
    // useEffect(getNextItem, [isLoading]) // Fetch initial Item when content is loaded

    const handleKeyDown = event => {
        const LEFT_ARROW = '37'
        const RIGHT_ARROW = '39'
        if (event.keyCode == LEFT_ARROW) {
            console.log('downvote')
        } else if (event.keyCode == RIGHT_ARROW) {
            console.log('upvote')
            getNextItem()
        }
    }

    const setupEventListeners = () => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }
    useEffect(setupEventListeners, [])

    console.log('loading?', isLoading)
    return isLoading ? (
        <div>Loading</div>
    ) : (
        <div>
            <DownVoteButton onClick={() => console.log('boo')}>Down</DownVoteButton>
            <UpVoteButton onClick={() => console.log('yay')}>Up</UpVoteButton>
            <Card>{nextItem.original_title}</Card>
        </div>
    )
}

export default Rate
