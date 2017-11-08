const express = require('express');
const usersDB = require('../db/users');
const secretDB = require('../db/secrets');
const secretUserDB = require('../db/secret-user');

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

router.post('/secrets', (req, res, next) => {
	const code = req.query.code;
	const secret = req.body.secret;
	let whoElseKnows = req.body.whoElseKnows;
	let userId;
	let secretId;

	if(whoElseKnows !== '') {
		whoElseKnows = Number(whoElseKnows);
	} else {
		whoElseKnows = null;
	}

	usersDB.getByCode(code)
		.then(user => {
			if(!user) return res.redirect('/');
			userId = user.id;

			return secretDB.add({secret: req.body.secret});
		})
		.then((id) => {
			secretId = id;
			return secretUserDB.add(secretId, userId);
		})
		.then(() => {
			if(whoElseKnows) {
				return secretUserDB.add(secretId, whoElseKnows);
			} else {
				return 'done';
			}
		})
		.then(() => {
			res.redirect(`/?code=${code}`);
		})
		.catch(err => {
			console.log(err);
			console.log(err.message);
			res.send(err);
		});
});

module.exports = router;
