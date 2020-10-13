const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

//Tehty 3.22
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.post('/api/persons', (request, response, next) => { //HTTP POST
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'Name or number missing' })
  }
  /*
    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }
    */
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => { //HTTP GET
  Person.findById(request.params.id)
    .then(p => {
      if (p) {
        response.json(p.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.get('/info', (req, res) => { //HTTP GET
  Person.find({}).then(persons => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p> ${Date()} </p>
        `)
  })
})

/*
const generateId = () => { //ID:n generointifunktio
    return Math.floor(Math.random() * 100)
}
*/

app.delete('/api/persons/:id', (req, res, next) => { //Delete from server
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    content: body.name,
    important: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})