const db = require('./connection');

function getByUser(id) {
	return db('user_secret').select().join('secret', 'secret_id', '=', 'secret.id').join('user', 'user_id', '=', 'user.id')
		.then(allSecrets => {
			const result = {
				mySecrets: [],
				otherSecrets: []
			};
			const notMySecrets = [];

			return result;
		})
}

module.exports = {
	getByUser
};
