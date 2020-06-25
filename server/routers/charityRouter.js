const express = require('express');
const router = express.Router();
const db = require('../models/database') // Potentially to save charities from the /saving middleware
const apiController = require('../controllers/apiControllers')


router.get('/', apiController.home, (req, res)=>{
    console.log('response obj: ', res.locals.response)
    res.send(200).json(res.locals.response).redirect('http://localhost:8081/api')
} /*get the charities */ )

// router.get('/filter', apiController.filter, (req, res)=>{
//     res.send(200)
// } /*filter charities */ )

router.post('/save', apiController.save, (req, res)=> {
    res.send({saved: res.locals.saved})
}/* save charities */ )

// router.delete('/remove', apiController.remove, (req,res) =>  {
//     res.send(200)
// } /* delete saved charities*/)

module.exports = router;

