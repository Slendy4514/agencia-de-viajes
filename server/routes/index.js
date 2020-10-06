const express = require('express');
const router = express.Router();

const nos = require('../controllers/nosotrosController');
const home = require('../controllers/homeController')
const tes = require('../controllers/testimoniosController')
const viajesController = require('../controllers/viajesController')

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function(){

    router.get('/', home.homePage);
    
    router.get('/nosotros', nos.infoNosotros);
    
    router.get('/viajes', viajesController.mostrarViajes);

    router.get('/viajes/:id', viajesController.mostrarViaje);

    router.get('/testimonial', tes.testimonios);

    router.post('/testimonial', tes.testimonioPost);

    return router;
}