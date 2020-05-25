const { Router } = require('express');

const routes = Router();

routes.get('/' , ()=>{
    console.log("Deu")
});
module.exports = routes;