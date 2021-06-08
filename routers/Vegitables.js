const express = require('express')
const router = express.Router()
const Veggies = require('../models/VegModel');

router.get('/', async (req, res) => {
    try {
        const Vegitables = await Veggies.find();
        res.json(Vegitables);

    } catch (err) {
        res.send('Error' + err);
    }
})

router.post('/', async (req, res) => {
    const vegitables = new Veggies({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    })
    try {
        const savedVeggies = await vegitables.save();
        res.json(savedVeggies);

    } catch (err) {
        res.send('Error' + err);
    }
})

module.exports = router;