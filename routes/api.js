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

module.exports = router;
