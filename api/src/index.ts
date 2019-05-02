const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json())

app.get('/ok', (request: any, response: any) => response.send('ok'))

export default app
