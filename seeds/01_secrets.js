
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('secret').del()
    .then(function () {
      // Inserts seed entries
      return knex('secret').insert([
        {id: 1, secret: 'I love Game of Thrones'},
        {id: 2, secret: 'I love coding'},
        {id: 3, secret: 'I stream every once in a while'}
      ]);
    });
};
