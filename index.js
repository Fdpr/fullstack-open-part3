const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


morgan.token('json', (req, res) => req.method === "POST" ? JSON.stringify(req.body) : null)

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const person = data.find(person => person.id === Number(req.params.id))
    if (person)
        res.json(person)
    else
        res.status(404).end()

})

app.delete('/api/persons/:id', (req, res) => {
    data = data.filter(person => person.id !== Number(req.params.id))
    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${data.length} people.</p><p>${new Date().toString()}</p>`)
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number)
        return res.status(400).json({error: "incomplete entry", request: req.body})
    else if (data.find(person => person.name === req.body.name))
        return res.status(400).json({error: "name must be unique", request: req.body})
    let id = 0
    do id = Math.floor(Math.random() * 10000000)
    while (data.find(person => person.id === id))
    const person = {name: req.body.name, number: req.body.number, id}
    data = data.concat(person)
    res.json(person)
})

app.listen(3001, "localhost", () => console.log("Server up"))