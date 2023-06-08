const cors = require('cors')
const express = require('express')
const { body, check, param, validationResult } = require('express-validator')
const mySqlProxy = require('./mySqlProxy')

const PORT = 8080
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Your endpoints here..

const promisePool = require('../PromisePool.js').promisePool

// app.get('/persons/:id', cors(corsOptions), async (req, res) => { 
//     // const result = await mySqlProxy.<YOUR FUNCTION HERE>
//     // const id = req.params['id']                  // Read parameters from URL.
//     // const personType = req.query['personType']   // Read query parameters from URL.
//     // const body = req.body                        // Read request body.
//     // res.send(<YOUR OBJECT HERE>)
//     res.send({message: 'Hey World'})
// })

app.get('/persons/:id', cors(corsOptions), async (req, res) => { 
    const personId = req.params['id']
    const person = await mySqlProxy.selectPersonById(personId)
    res.send(person)
})

app.get('/message', cors(corsOptions), async(req, res) => {
    res.send({message: 'Hi my name is Ariana Grande !!!'})
})

app.get('/persons/', cors(corsOptions), async (req,res) => {
    const persons = await mySqlProxy.selectPersons();
    res.send(persons);
})

app.get('/car/', cors(corsOptions), async (req,res) => {
    const cars = await mySqlProxy.selectCars();
    res.send(cars);
})

app.get('/cars/:id', cors(corsOptions), async (req, res) => { 
    const carId = req.params['id']
    const car = await mySqlProxy.selectCarById(carId)
    res.send(car)
})

app.get('/cars', cors(corsOptions), async (req, res) => { 
    const make = req.query.make
    const car = await mySqlProxy.selectCarByMake(make)
    res.send(car)
})

app.post('/cars/', cors(corsOptions), async (req, res) => { 
    const car = req.body 

    const newCar = await mySqlProxy.insertCar(car)
    res.send(newCar)
})

app.put('/cars/', cors(corsOptions), async (req, res) => {
    const car = req.body 
    const update = await mySqlProxy.updateCar(car)
    res.send(update)

})

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})
