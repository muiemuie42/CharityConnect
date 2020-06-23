const express = require('express');
const router = express.Router();
const db = require('../models/database') // Potentially to save charities from the /saving middleware
const apiController = require('../controllers/apiControllers')
const app = express()

app.get('/', apiController.home, (req, res)=>{
    res.send(200)
} /*get the charities */ )

app.get('/filter', apiController.filter, (req, res)=>{
    res.send(200)
} /*filter charities */ )

app.post('/save', apiController.save, (req, res)=> {
    res.send(200)
}/* save charities */ )

app.delete('/delete', apiCorntroller.delete, (req,res) =>  {
    res.send(200)
} /* delete saved charities*/)

module.exports = router;

