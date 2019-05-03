const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

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
    return response.send('register')
})

export default app
