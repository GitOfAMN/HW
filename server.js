require('dotenv').config()
// Require modules
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Vegetable = require('./models/fruit')
const { nextTick } = require('process')


// Create our express app
const app = express()

// Configure the app (app.set)
/*Start Config */
app.use(express.urlencoded({ extended: true })) 
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx') 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB Atlas')
})


/* END CONFIG */

// Mount our middleware (app.use)

/*Start Middleware */
app.use(methodOverride('_method'))

/* END Middleware */

// Mount Routes

/*Start Routes */
// INDEX --- READ --- GET
app.get('/vegetables', (req, res) => {
    Fruit.find({}, (err, foundFruits) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.render('vegetables/Index', {
          fruits: foundFruits
        })
      }
    })
  })
  
  // NEW (Not applicable in an api)
  app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New')
  })
  
  // DELETE
  app.delete('/vegetables/:id', (req, res) => {
    Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect('/vegetables')
      }
    })
  })
  
  // UPDATE
  app.put('/vegetables/:id', (req, res) =>{
    req.body.readyToEat === 'on' || req.body.readyToEat === true ? req.body.readyToEat === true : req.body.readyToEat = false
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedFruit) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect(`/vegetables/${updatedFruit._id}`)
      }
    })
  })
  
  // CREATE
  app.post('/vegetables', (req, res) => {
    req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false
    // ^^^ req.body is an object where we get the body or form data of the request (that the user sends to us/ that we get from the user). So we take the req.body and essentailly what happens it doesn't return a true/false sitation like a Boolean so we have to do something called massaging out data
    Fruit.create(req.body, (err, createdFruit) => {
      if(err){
        console.error(err)
        res.status(400).send(err)
      } else {
        res.redirect(`/vegetables/${createdFruit._id}`)
        //res.send(createdFruit)
      }
    })
  })
  
  // EDIT (not applicable in an api)
  app.get('/vegetables/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
      if(err){
       console.error(err)
       res.status(400).send(err)
      } else {
       res.render('vegetables/Edit', {
         fruit: foundFruit
       })
      }
    })
   })
  
  
  // SHOW ---- READ ---- GET
  app.get('/vegetables/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
      if(err){
       console.error(err)
       res.status(400).send(err)
      } else {
       res.render('vegetables/Show', {
         fruit: foundFruit
       })
      }
    })
   })
  
  
  
  /* END ROUTES */
  
  
  // Tell the app to listen on a port
  app.listen(3000, () => {
      console.log('Listening on Port 3000')
  })