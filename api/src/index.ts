import { user } from './database'

import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'
import * as jwt from 'jsonwebtoken'

import config from './config'
import * as database from './database'

// TODO: How do we feel about movies, message, token? Perhaps some type of union type of potential responses.
type ResponseBody = {
    success: boolean
    movies?: database.movie.MovieType[]
    message?: string
    token?: string
    user?: {}
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use((request: express.Request & any, response: express.Response, next: express.NextFunction) => {
    //TODO: How do I had UserType instead of any above.
    try {
        const token = request.headers.authorization.split(' ')[1]
        jwt.verify(token, config.tokenKey, (error: any, payload: any) => {
            console.log(payload)
            if (payload) {
                user.findByEmail(payload.email).then(doc => {
                    if (doc) {
                        request.user = doc
                        next()
                    }
                })
            }
        })
    } catch (error) {
        console.log('No token.')
        next()
    }
})

app.get(
    '/ok',
    (request: express.Request, response: express.Response): express.Response => {
        const responseBody: ResponseBody = {
            success: true,
            message: 'Server is running.'
        }
        return response.send(responseBody)
    }
)

app.get(
    '/',
    (request: express.Request, response: express.Response): express.Response => {
        const responseBody: ResponseBody = {
            success: true,
            message: 'This is the homepage.'
        }
        return response.send(responseBody)
    }
)

app.get(
    '/movies',
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const movies: database.movie.MovieType[] = await database.movie.getList()

        const responseBody: ResponseBody = { success: true, movies }
        return response.send(responseBody)
    }
)

app.post(
    '/login',
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const user = await database.user.findByEmail(request.body.email)
        let responseBody: ResponseBody
        if (user) {
            if (request.body.password === user.password) {
                const token = jwt.sign({ email: user.email, first_name: user.first_name, id: user.id }, config.tokenKey)
                responseBody = {
                    success: true,
                    message: 'Welcome!',
                    token
                }
            } else {
                responseBody = {
                    success: false,
                    message: 'That email or password is incorrect or that user does not exist.'
                }
            }
        } else {
            responseBody = {
                success: false,
                message: 'That email or password is incorrect or that user does not exist.'
            }
        }
        return response.send(responseBody)
    }
)

app.post(
    '/validate_token',
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const token = request.body.token
        let responseBody: ResponseBody = { success: false, message: '' }
        if (!token) {
            responseBody = { success: false, message: 'Must pass token' }
        } else {
            // TODO: This block below might fail, how to rewrite.
            jwt.verify(token, config.tokenKey, (error: any, user: any) => {
                if (error) {
                    responseBody = { success: false, message: 'Something went wrong' }
                } else {
                    responseBody = {
                        success: true,
                        user,
                        token
                    }
                }
            })
        }
        return response.send(responseBody)
    }
)

app.post(
    '/like',
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const record = await database.like.create({ ...request.body })
        const responseBody: ResponseBody = {
            success: true,
            message: 'Like recorded'
        }
        return response.send({ responseBody })
    }
)

app.post(
    '/register',
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const user = await database.user.findByEmail(request.body.email)
        let responseBody: ResponseBody
        if (user) {
            responseBody = {
                success: false,
                message: 'A user with that email address already exists. Please login instead.'
            }
        } else {
            await database.user.create(request.body)
            const token = jwt.sign(
                {
                    id: request.body.id,
                    email: request.body.email,
                    first_name: request.body.first_name
                },
                config.tokenKey
            )

            responseBody = {
                success: true,
                message: 'User registration successful!',
                token
            }
        }
        return response.send(responseBody)
    }
)

export default app
