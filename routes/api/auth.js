const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

//item model
const User = require('../../models/User')
// const { insertMany } = require('../../models/User')


// @route GET api/auth
// @description Authenticate user
// @access

router.post('/', (req, res) => {
    const { email, password } = req.body
    if(!email || !password ) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    //check for existing user 
    User.findOne({ email })
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist'})
        //validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})
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

// @route GET api/auth/user
// @description Get User Data
// @access

router.get('/user', auth, ((req, res) => {
    const {user: {id}} = req
    User.findById(id)
        .select('-password')
        .then(user => res.json(user))
}))

module.exports = router;

