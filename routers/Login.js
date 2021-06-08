const express = require('express')
const request = require('request')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.post('/subscribe', (req, res) => {
    console.log('subscribe');
    debugger
    if (!req.body.captcha) {
        return res.json({ success: false, message: 'Please select captcha' })
    }
    const secretKey = 'YOUR_SECRETE_KEY';
    const siteVerifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.socket.remoteAddress}`;

    request(siteVerifyUrl, (err, response, body) => {
        body = JSON.parse(body);
        if (body && !body.success) {
            return res.json({ success: false, message: 'Captcha verification failed' })
        }
        return res.json({ success: true, message: 'Captcha passed' })
    })
})

module.exports = router;