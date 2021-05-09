const router = require('express').Router();
const model = require('../models/example.js');
const {
    registerPartialTemplate,
     renderTemplate
    } = require('./HandlebarsHelper');



router.get('/', (request, response) => {
    model.doStuff(request).then(data => {
        renderTemplate('mvc/views/Example.hbs', data).then(html => {
            response.end(html);
        })
    });
});

module.exports = router;