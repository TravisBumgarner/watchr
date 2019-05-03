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

app.post('/login', function(request: any, response: any) {
    return response.send('login')
})

app.post('/register', function(request: any, response: any) {
    console.log(request.body)
    const user = database.user.findByEmail(request.body.email)
    console.log(user.length)
    if (user.length) {
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
