const express = require('express');
const usersDB = require('../db/users');

const router = express.Router();

router.post('/users', (req, res, next) => {
	usersDB.create(req.body)
		.then(user => {
			console.log(user);
			res.render('account-created', {
				show: {
					createAccount: false
				},
				user: user[0]
			});
		})
		.catch(err => next(err));
});

router.post('/users/login', (req, res, next) => {
	const code = req.body.code;

	usersDB.getByCode(code)
		.then(user => {
			if(user) return res.redirect(`/?code=${code}`);

			return res.redirect('/');
		})
		.catch(err => res.status(500).send(err.message));
});

module.exports = router;
