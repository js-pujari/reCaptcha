const express = require('express')
const router = express.Router()
const Utility = require('../models/UtilityModel');
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
    try {
        const Vegitables = await Utility.find();
        res.json(Vegitables);

    } catch (err) {
        res.send('Error' + err);
    }
})

router.post('/', async (req, res) => {
    const vegitables = new Utility({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    })
    try {
        const savedUtility = await vegitables.save();
        res.json(savedUtility);

    } catch (err) {
        res.send('Error' + err);
    }
})

router.post('/tkn', async (req, res, next) => {
    const url = req.headers.url;
    const data = req.headers.data;
    const method = req.headers.method;
    const header = req.headers.header ? JSON.parse(req.headers.header) : {};
    await fetch(url, {
        method: method ? method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...header
        },
        body: data ? JSON.stringify(data) : undefined
    }).then((x) => x.json()).then(json => {
        res.json({ success: true, msg: 'Data fetched successfully', data: json })
    }).catch((ex) => {
        res.json({ success: false, msg: 'Some error accured while fetching data' })
    })
});

module.exports = router;