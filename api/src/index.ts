const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const database = require('./database')

const app = express()
app.use(cors())
app.use(bodyParser.json())

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
