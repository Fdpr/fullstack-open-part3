const express = require('express')
const app = express()

app.use(express.json())

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
    let id = 0
    do id = Math.floor(Math.random() * 10000000)
    while (data.find(person => person.id === id))
    const person = {... req.body, id}
    data = data.concat(person)
    res.json(person)
})

app.listen(3001, "localhost", () => console.log("Server up"))