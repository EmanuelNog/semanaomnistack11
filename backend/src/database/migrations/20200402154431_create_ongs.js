
exports.up = function(knex) { //responsavel pela criacao da tabela, oque vai acontecer quando eu executar essa migration
  return knex.schema.createTable('ongs', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) {// "cara e se acontecer algum problema e eu precisar voltar atras", esse é o metodo down
   return knex.schema.dropTable('ongs');
};
