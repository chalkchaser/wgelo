
require('dotenv').config()

const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const Game = require('./models/game')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())





app.get('/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
    })
  })

  app.get('/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  app.post('/persons', (request, response) => {
    
    const body = request.body


    if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = new Person({
        name : body.name,
        elo : body.elo,
        wins: body.wins,
        losses: body.losses,
  
    })
 


    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })



  app.put('/persons/:id', (request, response)=>{
    const body = request.body

   

    const person = {
      name : body.name,
      elo : body.elo,
      elo : body.elo,
      wins: body.wins,

  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(  updatedPerson => { response.json(updatedPerson)
    })
  
  })

  app.get('/games', (request, response) => {
    Game.find({}).then(game => {
      response.json(game)
      })
  })

  app.post('/games', (request, response) => {
    const body = request.body
    
    const game = new Game({
      player1: body.player1,
      player2: body.player2,
      result: body.result,
      date: body.date,
    })

    game.save().then(savedGame => {
      response.json(savedGame)
    })

  })

  const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})