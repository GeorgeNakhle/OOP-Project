const router = require('express').Router();
const model = require(`${process.env.models}/SearchChat.js`);
const {renderTemplate} = require(`${process.env.controllers}/HandlebarsHelper`);

router.get('/', (request, response) => {
    model.doStuff(request).then(data => {
        renderTemplate(`${process.env.views}/SearchChat.hbs`, data).then(html => {
            response.end(html);
        })
    });
});

module.exports = router;