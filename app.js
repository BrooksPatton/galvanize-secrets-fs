const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'hbs');
app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use(express.static('public'));

app.listen(port, () => console.log(`App listening on port: ${port}`));
