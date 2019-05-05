import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Video } from 'SharedComponents'
import config from 'config'

// Sample Card
// adult: false
// backdrop_path: "/uZbAaJKJA6EQBRCLxzTJuD5m85P.jpg"
// belongs_to_collection: null
// budget: 10500000
// genres: (4) [{…}, {…}, {…}, {…}]
// homepage: "http://www.et20.com/"
// id: 601
// imdb_id: "tt0083866"
// original_language: "en"
// original_title: "E.T. the Extra-Terrestrial"
// overview: "After a gentle alien becomes stranded on Earth, the being is discovered and befriended by a young boy named Elliott. Bringing the extraterrestrial into his suburban California house, Elliott introduces E.T., as the alien is dubbed, to his brother and his little sister, Gertie, and the children decide to keep its existence a secret. Soon, however, E.T. falls ill, resulting in government intervention and a dire situation for both Elliott and the alien."
// popularity: 17.545
// poster_path: "/8htLKK03TJjKZOXJgihZCu8v0P.jpg"
// production_companies: (2) [{…}, {…}]
// production_countries: [{…}]
// release_date: "1982-06-11"
// revenue: 792965326
// runtime: 115
// spoken_languages: [{…}]
// status: "Released"
// tagline: "He is afraid. He is alone. He is three million light years from home."
// title: "E.T. the Extra-Terrestrial"
// video: false
// vote_average: 7.5
// vote_count: 6295

const MovieCard = styled(({ className, id }) => {
    const [movieDetails, setMovieDetails] = useState(null)
    const [video, setVideo] = useState(null)

    const getMovieDetails = () => {
        axios
            .get(`${config.tmdbUrl}/movie/${id}?api_key=${config.tmdbKey}`)
            .then(response => setMovieDetails(response.data))
            .catch(error => console.log(error))
    }
    useEffect(getMovieDetails, [id])

    const getVideos = () => {
        setVideo(null)
        axios
            .get(`${config.tmdbUrl}/movie/${id}/videos?api_key=${config.tmdbKey}`)
            .then(response => {
                const trailers = response.data.results
                    .filter(result => result.type.toLowerCase() === 'trailer')
                    .filter(result => result.site.toLowerCase() === 'youtube')
                trailers.length && setVideo(trailers[0])
            })
            .catch(error => console.log(error))
    }
    useEffect(getVideos, [id])
    return movieDetails ? (
        <div className={className}>
            <h2>{movieDetails.title}</h2>
            <h2>{movieDetails.overview}</h2>
            {video ? <Video videoKey={video.key} site={video.site} /> : null}
            <img src={`http://image.tmdb.org/t/p/w300///${movieDetails.poster_path}`} />
        </div>
    ) : null
})`
    width: 50vw;
    height: 100vh;
    background-color: ${props => props.color};
`

export default MovieCard
