require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('json', (req, res) => req.method === "POST" ? JSON.stringify(req.body) : null)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person)
            else res.status(404).end()
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({ error: "malformed id" })
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${data.length} people.</p><p>${new Date().toString()}</p>`)
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number)
        return res.status(400).json({ error: "incomplete entry", request: req.body })
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })
    person.save().then(result => res.json(person))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, "0.0.0.0", () => console.log(`Server up on port ${PORT}`))