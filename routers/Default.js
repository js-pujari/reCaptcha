const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ route: 'default', msg: 'Server is ready..', captcha: 'Go to login route for Captcha' })
})

module.exports = router;