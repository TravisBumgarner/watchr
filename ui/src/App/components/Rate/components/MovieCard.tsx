import * as React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Video } from 'SharedComponents'
import config from '../../../../config' //TODO: Get this to work with resolve.

type Movie = {
    adult: boolean
    backdrop_path: string
    belong_to_collection: any
    budget: number
    genres: any
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    post_path: string
    production_companies: any
    production_countries: any
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: any
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

type Trailer = {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    site: string
    size: number
    type: 'Trailer'
}

const MovieCard = styled(({ className, id }) => {
    const [movieDetails, setMovieDetails] = React.useState<Movie | null>(null)
    const [trailer, setTrailer] = React.useState<Trailer | null>(null)

    const getMovieDetails = () => {
        axios
            .get(`${config.tmdbUrl}/movie/${id}?api_key=${config.tmdbKey}`)
            .then(response => setMovieDetails(response.data))
            .catch(error => console.log(error))
    }
    React.useEffect(getMovieDetails, [id])

    const getTrailer = () => {
        setTrailer(null)
        axios
            .get(`${config.tmdbUrl}/movie/${id}/videos?api_key=${config.tmdbKey}`)
            .then(response => {
                const trailers = response.data.results
                    .filter(result => result.type.toLowerCase() === 'trailer')
                    .filter(result => result.site.toLowerCase() === 'youtube')
                trailers.length && setTrailer(trailers[0])
                console.log(trailers[0])
            })
            .catch(error => console.log(error))
    }
    React.useEffect(getTrailer, [id])

    return movieDetails ? (
        <div className={className}>
            <h2>{movieDetails.title}</h2>
            <h2>{movieDetails.overview}</h2>
            {trailer ? <Video videoKey={trailer.key} site={trailer.site} /> : null}
            <img src={`http://image.tmdb.org/t/p/w300///${movieDetails.poster_path}`} />
        </div>
    ) : null
})`
    width: 50vw;
    height: 100vh;
    background-color: ${props => props.color};
`

export default MovieCard
