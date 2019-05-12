import * as React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Theme from 'Theme'
import { Text, Header } from 'SharedComponents'
import config from 'Config'

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
    poster_path: string
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

// type Trailer = {
//     id: string
//     iso_639_1: string
//     iso_3166_1: string
//     key: string
//     name: string
//     site: string
//     size: number
//     type: 'Trailer'
// }

const DetailsWrapper = styled.div`
    border-radius: 24px;
    box-shadow: -5px 5px 10px #b5b5b5;
    width: 300px;
    height: 450px;
    background-color: ${Theme.color.accent};
    padding: ${Theme.spacing.small};
    box-sizing: border-box;
    overflow: scroll;
`

const Poster = styled.img`
    border-radius: 24px;
    box-shadow: -5px 5px 10px #b5b5b5;
`

const Wrapper = styled.div`
    cursor: pointer;
`

const MovieCard = ({ className, id }) => {
    const [movieDetails, setMovieDetails] = React.useState<Movie | null>(null)
    // const [trailer, setTrailer] = React.useState<Trailer | null>(null)
    const [showDetails, toggleShowDetails] = React.useState<boolean>(false)

    React.useEffect(() => toggleShowDetails(false), [id])

    const getMovieDetails = () => {
        axios
            .get(`${config.tmdbUrl}/movie/${id}?api_key=${config.tmdbKey}`)
            .then(response => setMovieDetails(response.data))
            .catch(error => console.log(error))
    }
    React.useEffect(getMovieDetails, [id])

    // const getTrailer = () => {
    //     setTrailer(null)
    //     axios
    //         .get(`${config.tmdbUrl}/movie/${id}/videos?api_key=${config.tmdbKey}`)
    //         .then(response => {
    //             const trailers = response.data.results
    //                 .filter(result => result.type.toLowerCase() === 'trailer')
    //                 .filter(result => result.site.toLowerCase() === 'youtube')
    //             trailers.length && setTrailer(trailers[0])
    //         })
    //         .catch(error => console.log(error))
    // }
    // React.useEffect(getTrailer, [id])

    return movieDetails ? (
        <Wrapper onClick={() => toggleShowDetails(!showDetails)}>
            {showDetails ? (
                <DetailsWrapper>
                    <Header level="h2">{movieDetails.title}</Header>
                    <Text>Popularity: {movieDetails.popularity}</Text>
                    <Text>Vote Count: {movieDetails.vote_count}</Text>
                    <Text>Vote Average: {movieDetails.vote_average}</Text>
                    <Text>{movieDetails.overview}</Text>
                </DetailsWrapper>
            ) : (
                <Poster src={`http://image.tmdb.org/t/p/w300///${movieDetails.poster_path}`} />
            )}
        </Wrapper>
    ) : null
}

export default MovieCard
