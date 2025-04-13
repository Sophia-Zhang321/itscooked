const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

let temp = -1

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hi', (req, res) => {
    res.send('Hi!')
  })


app.post('/temp', (req, res) => {
    const body = req.body
    console.log(body.data)
    temp = body.data
    res.send(body)
})

app.get('/temp', (req, res) => {
    res.send(temp)
}
)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})