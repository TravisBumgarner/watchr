import React from 'react'
import ReactPlayer from 'react-player'

const Video = ({ site, videoKey }) => {
    let url = null

    switch (site) {
        case 'YouTube':
            url = `https://www.youtube.com/watch?v=${videoKey}`
            break
        case 'Venmo':
            url = `https://www.youtube.com/watch?v=${videoKey}`
            break
        default:
            url = ''
    }
    console.log(url)
    if (!url.length) {
        return null
    }
    return <ReactPlayer url={url} />
}

export default Video
