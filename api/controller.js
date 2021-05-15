const router = require('express').Router();

router.post('/login', require(`${process.env.api}/login.js`));
router.post('/register', require(`${process.env.api}/register.js`));

module.exports = router;