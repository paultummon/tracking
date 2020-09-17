const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')

//item model
const User = require('../../models/User')


// @route GET api/items
// @description Register New User
// @access

router.post('/', (req, res) => {
    const { name, email, password } = req.body
    if( !name || !email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    //check for existing user 
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'})

        const newUser = new User({
            name,
            email,
            password,
            admin: false
        })

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err
                            res.json({ 
                                token,
                                user: {
                                name: user.name,
                                id: user.id,
                                email: user.email 
                               }
                             })
                        }
                    )
                    
                })
            })
        })
    })
})

router.post('/admin', (req, res) => {
    const { name, email, password } = req.body
    if( !name || !email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    //check for existing user 
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'})

        const newUser = new User({
            name,
            email,
            password,
            admin: true
        })

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err
                            res.json({ 
                                token,
                                user: {
                                name: user.name,
                                id: user.id,
                                email: user.email 
                               }
                             })
                        }
                    )
                    
                })
            })
        })
    })
})

// @route POST api/items
// @description CREATE A Item
// @access

module.exports = router;

