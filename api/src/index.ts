const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
var sessions = require('client-sessions')

const database = require('./database')

const app = express()
const ONE_DAY = 24 * 60 * 60 * 1000
app.use(
    sessions({
        cookieName: 'authentiasdasdcated',
        secret: 'CHANGasdasdasdasdEME', // TODO: How long should a secret be?
        duration: ONE_DAY,
        activeDuration: ONE_DAY // TODO: Better values here?
    })
)
app.use(cors())
app.use(bodyParser.json())

// app.use((requst: any, response: any, next: any) => {
//     if (requst.session.seenyou) {
//         response.setHeader('X-Seen-You', 'true')
//     } else {
//         requst.session.seenyou = true
//         response.setHeader('X-Seen-You', 'false')
//     }
// })

app.get('/ok', function(request: any, response: any) {
    return response.send('ok')
})

app.get('/', function(request: any, response: any) {
    console.log(request.session)
    return response.send('home')
})

app.post('/login', async (request: any, response: any) => {
    const user = await database.user.findByEmail(request.body.email)
    if (user) {
        if (request.body.password === user.password) {
            console.log(response)
            request.session.user = 'user' // 14:49 in the video, still don't quite understand this line,
            return response.send({
                success: true,
                message: "You're in!"
            })
        } else {
            return response.send({
                success: false,
                message: 'That email or password is incorrect or that user does not exist.'
            })
        }
    } else {
        return response.send({
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
