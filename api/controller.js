const router = require('express').Router();

// /api => /login
router.use('/', require(`${process.env.api}/login.js`));

module.exports = router;