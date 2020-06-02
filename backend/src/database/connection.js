const knex = require( 'knex');
const configuration = require ('../../knexfile'); // aqui esta voltando duas pastas e importando o knexfile

const connection = knex( configuration.development); //cria a coneccao de development que esta dentro da pasta knexfile

module.exports = connection;