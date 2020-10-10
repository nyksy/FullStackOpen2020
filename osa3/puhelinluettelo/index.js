const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

//Tehty 3.11 asti
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons/:id', (request, response) => { //HTTP GET
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => { //HTTP GET
    const amount = persons.length;
    const timeOfRequest = Date();
    return res.send(
        `
        <p>Phonebook has info for ${amount} people</p>
        <p> ${timeOfRequest} </p>
        `
    )
})

const generateId = () => {
    return Math.floor(Math.random() * 100)
}

app.post('/api/persons', (request, response) => { //HTTP POST
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }
    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (req, res) => { //HTTP DELETE
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        persons = persons.filter(p => p !== person)
        res.json(persons)
    } else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})