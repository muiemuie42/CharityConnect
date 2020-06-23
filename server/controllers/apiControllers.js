const db = require('../models/database');
const express = require('express');

const apiController = {};

apiController.home = (req, res, next)=>{
    console.log('home')
    return next()

}

apiController.save = (req, res, next)=>{
    console.log('saved')
    return next()

}

apiController.filter = (req, res, next)=>{
    console.log('filtered')
    return next()
}

apiController.delete = (req, res, next)=>{
    console.log('delete')
    return next()
}

module.exports = apiController;