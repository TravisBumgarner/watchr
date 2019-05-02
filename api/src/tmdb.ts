import axios from 'axios'
import * as zlib from 'zlib'

interface Params {
    [key: string]: string
}

const request = (endpoint: string, params: Params) => {
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const query =
        '?' +
        Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&')

    axios.get(BASE_URL + endpoint + query)
}

const get_daily_file_exports = async (type: 'movie' | 'tv_series') => {
    const [year, month, day] = new Date()
        .toISOString()
        .split('T')[0]
        .split('-')
    const url = `http://files.tmdb.org/p/exports/${type}_ids_${month}_${day}_${year}.json.gz`
    const { data } = await axios.get(url)
    zlib.gunzip(data, (error: any, buff: any) => {
        if (error != null) {
            console.log(error)
        } else {
            console.log(buff)
        }
    })
}

get_daily_file_exports('movie')

export default { request, get_daily_file_exports }
