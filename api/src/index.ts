import { user } from './database'

import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

import config from './config'
import * as database from './database'

const hashAndSaltPassword = (password: string): string => {
    const hash = bcrypt.hashSync(password, config.salt)
    return hash
}

// TODO: How do we feel about movies, message, token? Perhaps some type of union type of potential responses.
type ResponseBody = {
    success: boolean
    movies?: database.movie.MovieType[] | any //TODO: Change this
    message?: string
    token?: string
    user?: {}
    likes?: string[]
    users?: database.user.RegisteredUserType[]
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

// TODO: Let's not any on the next line
const ensureAuthenticated = (request: express.Request & any, response: express.Response, next: express.NextFunction) => {
    if (request.user.isAuthenticated) {
        return next()
    } else {
        return response.status(403).send({ success: false, message: 'Please login' })
    }
}

app.use((request: express.Request & any, response: express.Response, next: express.NextFunction) => {
    //TODO: How do I had UserType instead of any above.
    request.user = { isAuthenticated: false }
    try {
        const token = request.headers.authorization.split(' ')[1]
        jwt.verify(token, config.tokenKey, (error: any, payload: any) => {
            if (payload) {
                user.findByUsername(payload.username).then(doc => {
                    if (doc) {
                        request.user = { isAuthenticated: true, ...doc }
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
    ensureAuthenticated,
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const movies: database.movie.MovieType[] = await database.movie.getList()

        const responseBody: ResponseBody = { success: true, movies }
        return response.send(responseBody)
    }
)

app.get(
    '/likes',
    ensureAuthenticated,
    async (request: express.Request & any, response: express.Response): Promise<express.Response> => {
        console.log(request.query)
        //TODO: Refactor this mess.
        const friendLikes: database.like.LikeType[] = await database.like.findByUserId(request.query.id)
        const friendLikeIds: string[] = friendLikes.filter(({ liked }) => liked == true).map(like => like.movie_id)

        const userLikes: database.like.LikeType[] = await database.like.findByUserId(request.user.id)
        const userLikeIds: string[] = userLikes.filter(({ liked }) => liked == true).map(like => like.movie_id)

        const friendSet = new Set([...friendLikeIds])
        const userSet = new Set([...userLikeIds])
        const intersection = new Set([...friendSet].filter(x => userSet.has(x))) // tslint:disable-line

        const movies = await [...intersection].map(async id => {
            const response = await database.movie.getById(id)
            return response[0]
        })

        const movies2 = await Promise.all(movies)

        const responseBody: ResponseBody = { success: true, likes: [...intersection], movies: movies2 }
        return response.send(responseBody)
    }
)

app.get(
    '/users',
    ensureAuthenticated,
    async (request: express.Request & any, response: express.Response): Promise<express.Response> => {
        const users: database.user.RegisteredUserType[] = await database.user.getAllNotCurrentUser(request.user.id)

        const responseBody: ResponseBody = { success: true, users }
        return response.send(responseBody)
    }
)

app.post(
    '/login',
    async (request: express.Request, response: express.Response): Promise<express.Response> => {
        const user = await database.user.findByUsername(request.body.username)
        let responseBody: ResponseBody
        if (user) {
            if (hashAndSaltPassword(request.body.password) === user.password) {
                const token = jwt.sign(
                    { email: user.email, first_name: user.first_name, id: user.id, username: user.username },
                    config.tokenKey
                )
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
    ensureAuthenticated,
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
        let responseBody: ResponseBody

        const userByUsername = await database.user.findByUsername(request.body.username)
        const userByEmail = await database.user.findByEmail(request.body.email)

        if (userByUsername || userByEmail) {
            let message

            if (userByUsername && userByEmail) {
                message = 'Sorry, the username and email address you entered are both taken.'
            } else if (userByUsername) {
                message = 'Sorry, the username you entered is already taken.'
            } else if (userByEmail) {
                message = 'Sorry, the email address you entered is already taken.'
            }

            responseBody = {
                success: false,
                message
            }
        } else {
            const hash = hashAndSaltPassword(request.body.password)
            request.body.password = hash

            await database.user.register(request.body)
            const token = jwt.sign(
                {
                    id: request.body.id,
                    username: request.body.username,
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
