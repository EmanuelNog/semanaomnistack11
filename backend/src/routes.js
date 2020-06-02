const express = require ('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
    
    

const routes = express.Router();

/**nao necessariamente voce vai estar criando algo, mas o post é mais para 
 * sinalizar sua intencao de criar uma sessao*/
routes.post('/sessions',SessionController.create); 

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index); 

routes.get ('/incidents', IncidentController.index);
routes.post ('/incidents', IncidentController.create);

//agr precisa saber qual o incident que quer deletar, por isso e possado o hold param :id
routes.delete ('/incidents/:id', IncidentController.delete);
module.exports = routes;