
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments(); // chave primaria de auto incremento

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //criacao de uma string que ira servir como referencia da foreign key
        
        table.foreign('ong_id').references('id').inTable('ongs');//foreign key referenciando a ong, pois nao pode existir um incident sem uma ong
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
