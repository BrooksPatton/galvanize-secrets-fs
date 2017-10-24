const express = require('express');
const usersDB = require('../db/users');
const secretsDB = require('../db/secrets');

const router = express.Router();

router.get('/', (req, res) => {
	const code = req.query.code;

	if(code) {
		usersDB.getByCode(code)
			.then(user => {
				req.user = user;
				return secretsDB.getByUser(user.id)
			})
			.then(secrets => {
				console.log(secrets);
				res.render('index', {
					show: {
						createAccount: false,
						logout: true,
						secrets: true
					},
					user: req.user,
					secrets
				})
			})
			.catch(err => res.status(500).send(err));
	} else {
		res.render('index', {
			show: {
				createAccount: true
			}
		});
	}
});

router.get('/create-account', (req, res) => {
	res.render('new-account-or-login', {
		show: {
			createAccount: false
		}
	});
});

module.exports = router;
