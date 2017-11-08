const db = require('./connection');

function getByUser(id) {
	return db('user_secret').select().join('secret', 'secret_id', '=', 'secret.id').join('user', 'user_id', '=', 'user.id').orderBy('secret.id')
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

			result.mySecrets = result.mySecrets.filter((secret) => {
				for(let i = 0; i < result.otherSecrets.length; i = i + 1) {
					const current = result.otherSecrets[i];

					if(secret.secret_id === current.secret_id) {
						if(secret.id < current.id) {
							return true;
						} else {
							return false;
						}
					}
				}
			});

			result.otherSecrets = result.otherSecrets.filter(secret => {
				for(let i = 0; i < result.mySecrets.length; i = i + 1) {
					const current = result.mySecrets[i];

					if(secret.secret_id === current.secret_id) {
						if(secret.id < current.id) {
							return true;
						} else {
							return false;
						}
					}
				}
			})

			console.log(result);

			return result;
		})
}

function add(secret) {
	return db('secret').insert(secret).returning('id')
		.then(id => id[0]);
}

module.exports = {
	getByUser,
	add
};
