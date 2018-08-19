var express = require('express');
var app = express();

app.set('view engine', 'ejs');

let bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

app.use('/public', express.static('public'));

app.use('/createAnimal',(req,res)=>{
	if(req.body.femenino='on')
		req.body.gender='female';
	else
		req.body.gender='male';

	let newAnimal = new Animal(
		req.body
	)
	console.log(req.body)
	console.log(newAnimal);
	newAnimal.save((err)=>{
		if(err){
			res.type('html').status(500);
			res.send('Error: '+ err);
		}else{
			res.send('Nuevo animal creado.');
		}
	});
});


app.use('/', (req, res) => {
	
	res.json({ msg : 'It works!' });
    });


app.listen(3000, () => {
	console.log('Listening on port 3000');
    });



// Please do not delete the following line; we need it for testing!
module.exports = app;
