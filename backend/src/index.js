/* 
Metodos HTTP;
get: Buscar uma informacao do back-end;
post: Criar uma informacao no back-end;
put: Alterar uma informacao no back-end;
delete: Deletar uma informacao no back-end;
*/
/*
Tipos de parametros;
Query params: parametros nomeados enviados na rota, apos "?" e geralmenteservem para filtros, paginacao,... (ex: ?name=Diego);
Route params: parametros utilizados para identificar um unico recurso ('/users/1', no caso estou buscando os paramentros do usuario 1);
Request Body: Corpo da requisicao, utilizado para criar ou alterar recursos,(exemplo, criar ou alterar um usuario)(no body nos sempre usamos o formato json);
*/
/**
 * Banco de dados: (existem varios porem alguns exemplos sao:)
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server (mais utilizados,mais estruturados, o SQLite ja veio na nossa aplicacao, e como todos os SQL'spossuem estrutura similar, e facil migrar entre os bancos, ao contrario dosNoSQL);
 * NoSQL: MongoDB, CouchDB, etc (a estrutura da nossa tabela fica muito livre e pouco estruturado);
 */
/** Formas de Utilizar o banco na aplicacao
 * Driver : SELECT * FROM users;
 * Query Builder: table('users').select('*')| assim ele estara pronto para aceitarqualquer banco SQL;
 */
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //o ./ referencia a mesma pasta do arquivo index, se fosse uma pasta antes seria ../

const app = express();

app.use(cors()); /* como ainda estamos em desenvolvimento nao utilizaremos o "origin" do cors, mas e necessario usar no modelo final do site*/
app.use(express.json());//estou dizendo para o express ir no corpo da minha requisicao e converter o JSON em um objeto do javascript(muito importante que venha antes de todas as requisicoes)
app.use(routes);

app.listen(3333);
