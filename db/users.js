const db = require('./connection');

function create(user) {
	return generateUniqueCode()
		.then(code => {
			user.code = code;
			return user;
		})
		.then(user => {
			return db('user').insert(user).returning(['*']);
		});
}

function generateUniqueCode() {
	const characters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	let code = '';
	let codeLength = 5;

	for(let i = 0; i < codeLength; i++) {
		const rand = Math.floor(Math.random() * characters.length);

		code += characters[rand];
	}

	return db('user').select('code').where('code', code)
		.then(res => {
			return res.length === 0 ? code : false;
		})
		.catch(err => Promise.reject(err));
}

function getByCode(code) {
	return db('user').select().where('code', code).first();
}

function getAllBut(id) {
	return db('user').select().where('id', '!=', id);
}

module.exports = {
	create,
	getByCode,
	getAllBut
};
