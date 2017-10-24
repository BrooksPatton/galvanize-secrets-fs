const db = require('./connection');

function getByUser(id) {
	return db('user_secret').select().where('user_id', id).join('secret', 'secret_id', '=', 'secret.id').join('user', 'user_id', '=', 'user.id');
}

module.exports = {
	getByUser
};
