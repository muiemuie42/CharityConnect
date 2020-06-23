const db = require('../models/database');

const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const userController = {};

userController.createUser = (req, res, next) => {
    // check to see if in DB
    const { username, password } = req.body;
    console.log(req.body.username, req.body.password)

    // if one is missing?
    if (!username.length || !password.length) {
        return next({
            log: {err: 'createUser: username or password undefined'},
            message: 'Missing username or password'
        })
    }
    //check db to see if username exists
    const text1 = 'SELECT * FROM users where username = $1';
    const params1 = [username];
    db.query(text1, params1, (err, response) => {
        if (err) {
            return next({
                log: `Error: ${err}`
            })
        } else {
            // if username exists
            if(params1) {
                // console.log('object: ',response.rows[0])
                bcrypt.compare(password, response.rows[0].password, function(err, result) {
                    if(err) {
                        return next({
                            log: `Error is: ${err}`
                        })    
                    } else {
                        res.locals.user = response.rows[0].username;
                        return next();
                    }
                });
            } else {
                //if user doesn't exist 
                // hash password
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    // Store hash in your password DB.
                    const text2 = 'INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *';
                    const params2 = [username, hash];
                    db.query(text2, params2, (err, response)=>{
                        if(err){
                            return next({
                                log: `createUser: ${err}`
                            })
                        } else {
                            //save username
                            // console.log(response.rows)
                            res.locals.user = response.rows[0].username;
                            // console.log('username: ', res.locals.username)
                            return next();
                        }
                    })
                });
            }
        }
    })
}


module.exports = userController;
