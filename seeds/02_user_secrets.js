
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_secret').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_secret').insert([
        {id: 1, user_id: 1, secret_id: 1},
        {id: 2, user_id: 1, secret_id: 2},
        {id: 3, user_id: 3, secret_id: 3}
      ]);
    });
};
