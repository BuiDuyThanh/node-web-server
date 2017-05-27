const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');	// key-value

// middleware config
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});

	next();		// without next(), the code below won't be executed
});

/*
// maintenance middleware to stop below code executing
app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public')); // app.use(express.static('public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my page.',
	//	currentYear: new Date().getFullYear()
	});
});

/*

app.get('/', (req, res) => {
//	res.send('<h1>Hello Express!</h1>');
	res.send({
		name: 'Thanh',
		hobbies: [
			'Football',
			'Music'
		]
	});
});

*/

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	//	currentYear: new Date().getFullYear()
	});
});

/*
app.get('/about', (req, res) => {
	res.send('About Page');
});
*/

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad request',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});