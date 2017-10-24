
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_secret', table => {
      table.increments();
      table.integer('user_id').references('user.id').onDelete('cascade');
      table.integer('secret_id').references('secret.id').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_secret')
  ]);
};
