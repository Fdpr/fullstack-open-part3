require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('json', (req, res) => req.method === "POST" ? JSON.stringify(req.body) : null)

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))
app.use(express.static('dist'))


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => res.json(person))
        .catch(() => res.status(404).end())
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
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })
    person.save().then(result => res.json(person))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, "0.0.0.0", () => console.log(`Server up on port ${PORT}`))