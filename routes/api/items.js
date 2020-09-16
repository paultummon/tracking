const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')
//item model
const Item = require('../../models/Item')


// @route GET api/items
// @description GET ALL Items
// @access

router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items =>  res.json(items))
})

// @route POST api/items
// @description CREATE A Item
// @access Private

router.post('/', auth, (req, res) => {
    const {body: {name}} = req
    const newItem = new Item({
        name: name
    })

    newItem.save().then(item => {
        res.json(item)
    })
})


// @route DELETE api/items/:id
// @description DELETE an Item
// @access Private

router.delete('/:id', auth, (req, res) => {
   const {params : { id }} = req
   Item.findById(id)
   .then(item => item.remove().then(() => {
       res.json({success: true})
   })).catch(err => res.status(404).json({success: false}))
   
})


module.exports = router;

