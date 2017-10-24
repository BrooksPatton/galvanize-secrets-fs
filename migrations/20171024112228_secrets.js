
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('secret', table => {
      table.increments();
      table.text('secret');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('secret')
  ]);
};
