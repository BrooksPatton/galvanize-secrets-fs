
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, username: 'brooks', email: 'brooks@email.com', code: '1234'},
        {id: 2, username: 'michelle', email: 'michelle@email.com', code: '5678'},
        {id: 3, username: 'berto', email: 'berto@email.com', code: '9012'}
      ]);
    });
};
