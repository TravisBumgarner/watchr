const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
var sessions = require('client-sessions')

const database = require('./database')

const app = express()
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:3000' }))
app.use(bodyParser.json())
app.use(
    sessions({
        cookieName: 'session',
        secret: 'somecrazykeythatyoushouldkeephidden',
        duration: 60 * 60 * 1000,
        activeDuration: 1000 * 60 * 5,
        cookie: {
            maxAge: 60000,
            httpOnly: false,
            secure: false,
            domain: 'http://127.0.0.1:3000'
        }
    })
)

app.use(function(request: any, response: any, next: any) {
    if (request.session.seenyou) {
        response.setHeader('X-Seen-You', 'true')
    } else {
        request.session.seenyou = true
        response.setHeader('X-Seen-You', 'false')
    }
    next()
})

app.use((request: any, response: any, next: any) => {
    const path = request.originalUrl
    if (request.session.user) {
        console.log('session')
        console.log(request.session)
    } else {
        console.log('no session')
    }
    next()
})

app.get('/ok', function(request: any, response: any) {
    return response.send('ok')
})

app.get('/', function(request: any, response: any) {
    return response.send('home')
})

app.post('/login', async (request: any, response: any) => {
    const user = await database.user.findByEmail(request.body.email)
    if (user) {
        if (request.body.password === user.password) {
            request.session.user = user
            console.log(response.getHeaders())
            console.log(request.session)
            response.status(200).send({
                success: true,
                user // Send user
            })
        } else {
            response.send({
                success: false,
                message: 'That email or password is incorrect or that user does not exist.'
            })
        }
    } else {
        response.send({
            success: false,
            message: 'That email or password is incorrect or that user does not exist.'
        })
    }
})

app.post('/register', (request: any, response: any) => {
    const user = database.user.findByEmail(request.body.email)
    if (user) {
        return response.send({
            success: false,
            message: 'A user with that email address already exists. Please login instead.'
        })
    } else {
        database.user.create(request.body).then(() => {
            return response.send({
                success: true,
                message: 'User registration successful!'
            })
        })
    }
})

export default app
