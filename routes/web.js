const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		show: {
			createAccount: true
		}
	});
});

router.get('/create-account', (req, res) => {
	res.render('new-account-or-login', {
		show: {
			createAccount: false
		}
	});
});

module.exports = router;
