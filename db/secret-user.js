const db = require('./connection');

function add(secret_id, user_id) {
	return db('user_secret').insert({secret_id, user_id});
}

module.exports = {
	add
};
