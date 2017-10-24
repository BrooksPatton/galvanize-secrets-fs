const express = require('express');
const usersDB = require('../db/users');

const router = express.Router();

router.get('/', (req, res) => {
	const code = req.query.code;

	if(code) {
		usersDB.getByCode(code)
			.then(user => {
				res.render('index', {
					show: {
						createAccount: false,
						logout: true
					},
					user
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
