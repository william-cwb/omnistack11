const express = require('express');
const ong_controller = require('./controllers/ong_controller')
const incident_controller = require('./controllers/incident_controller')
const profile_controller = require('./controllers/profile_controller')
const auth_controller = require('./controllers/auth_controller')

const routes = express.Router();

routes.post('/auth', auth_controller.index);

routes.get('/ongs', ong_controller.index);
routes.post('/ong', ong_controller.store);

routes.get('/incidents', incident_controller.index);
routes.post('/incident', incident_controller.store);
routes.delete('/incident/:id', incident_controller.destroy);

routes.get('/profile', profile_controller.index);

module.exports = routes;  