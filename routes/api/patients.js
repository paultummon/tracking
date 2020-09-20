const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')

const Patient = require('../../models/Patient')

router.post('/', (req, res) => {
    const { name, currentLocation, baseLocation, notificationMessage, roamingRange } = req.body
    if( !name || !currentLocation || !baseLocation || !notificationMessage || !roamingRange ) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    Patient.findOne({ name })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'Patient already exists'})

        const newPatient = new Patient({
            name,
            currentGeoLocation: currentLocation,
            baseGeoLocation: baseLocation,
            roamingRange
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPatient.password, salt, (err, hash) => {
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

    Patient.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists'})

        const newUser = new User({
            name,
            email,
            password,
            admin: true
        })

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

module.exports = router;

