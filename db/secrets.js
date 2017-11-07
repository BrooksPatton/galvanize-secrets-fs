const db = require('./connection');

function getByUser(id) {
	return db('user_secret').select().join('secret', 'secret_id', '=', 'secret.id').join('user', 'user_id', '=', 'user.id')
		.then(allSecrets => {
			const result = {
				mySecrets: [],
				otherSecrets: []
			};
			const notMySecrets = [];

			allSecrets.forEach(secret => {
				if(secret.user_id === id) result.mySecrets.push(secret);
			});

			allSecrets.forEach(secret => {
				for(let i = 0; i < result.mySecrets.length; i = i + 1) {
					if(result.mySecrets[i].secret_id === secret.secret_id && secret.user_id !== id) {
						result.otherSecrets.push(secret);
					}
				}
			});

			for(let i = result.mySecrets.length - 1; i >= 0; i = i - 1) {
				for(let j = 0; j < result.otherSecrets.length; j = j + 1) {
					if(result.mySecrets[i].secret_id === result.otherSecrets[j].secret_id) {
						result.mySecrets.splice(i, 1);
					}
				}
			}

			return result;
		})
}

module.exports = {
	getByUser
};
