const db = require('../models/database');
const express = require('express');
const axios = require('axios');

const apiController = {};

apiController.home = async (req, res, next)=>{
    // will have no req body
    // will make a request from the api
    // saving it to res.locals
    //sending resonse onwards
    // https://api.data.charitynavigator.org/v2/Organizations?app_id=acad48f7&app_key=1caab9869fdb918b252c8f56de6b62ce&pageSize=999&sort=RATING
    // If no requests have been made display the fetch
    console.log('bodyyyy',req.body) // Ask Tommy where we will get the data
    const url = req.body.url || 'https://api.data.charitynavigator.org/v2/Organizations?app_id=acad48f7&app_key=1caab9869fdb918b252c8f56de6b62ce&pageSize=50&sort=RATING'
    await axios.get(url)
    .then(response => {
        res.locals.response = response;
    })
    .catch(err => console.log('The error when fetching the home API is ', err));
    return next()
}

apiController.save = (req, res, next)=>{
    // will post req.body
    console.log(req.query)
    let { name, financialrating, accountabilityrating, category, href, id} = req.query;
    //!! make sure to tell tommy to give null for charities without category and href and 0 for charities without ratings
    // send it to the db

    // uppercase strings
    name = name.toUpperCase();
    category = category.toUpperCase();
    
    // add charity to charity table
    // check to see if charity exist if it doesnt
    const text1 = `NSERT INTO charity 
                    (name, financialrating, accountabilityrating, category, href)
                    values ('Home', 63, 34, 'ANIMALS', 'http://api.CharityNavigator.com/')
                    on CONFLICT (name) DO NOTHING`;
    const param1 = [name, financialrating, accountabilityrating, category, href];
    db.query(text1, param1, (err, response)=>{
        if(err){
            next({
                log: {err: 'apiController_Save: cannot add charity to charity table'},
                message: 'Cannot add to saved'
            })
        }
        console.log('charity id: ', response.rows[0]._id);
        res.locals.charid = response.rows[0]._id; 
    })

    // saved it to db
    const text2 = 'INSERT INTO charity_favs (user_id, charity_id) values ($1 $2)';
    const param2 = [res.locals.charid, id];
    db.query(text2, param2, (err, res)=>{
        // add charity _id and user _id to join table
        if(err){
            next({
                log: {err: 'apiController_Save: cannot add charity_id and user_id to charity_favs table'},
                message: 'Cannot add to saved'
            })
        } 
    })

    // return to user all saved charities
    const text3 = `SELECT ch.* 
                   FROM charity_favs cf, charity ch 
                   WHERE cf.user_id = $1 
                   AND ch._id = cf.charity_id`
    db.query(text3, id, (err, response) => {
        if(err){
            next({
                log: {err: 'apiController_Save: Join Table charity_favs cannot save it to the specific user_id'},
                message: 'We\'re having an issue adding to the favs'
            })
        }
        console.log('response object', response)
        res.locals.saved = response.rows[0];
    })
    
    return next()

}

// apiController.delete = (req, res, next)=>{
//     console.log('delete')
//     return next()
// }

module.exports = apiController;