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
	//console.log(req.body)
	//console.log(newAnimal);
	newAnimal.save((err)=>{
		if(err){
			res.type('html').status(500);
			res.send('Error: '+ err);
		}else{
			res.send('Nuevo animal creado.');
		}
	});
});

app.use('/createToy',(req,res)=>{
	let newToy = new Toy(
		req.body
	);
	console.log(newToy);
	newToy.save((err)=>{
		if(err){
			res.type('html').status(500);
			res.send('Error: '+err);
		}else{
			res.send('Nuevo juguete creado.');
		}
	})
})

app.use('/findToy',(req,res)=>{
	let searchToy = req.query.id;
	Toy.findOne({id:searchToy},(err,toy)=>{
		if(err){
			res.type('html').status(500);
			res.send('Error: '+err);
		}else{
		 	console.log(toy);
		 	res.json(toy);
		 }
	});
})
app.use('/findAnimal',(req,res)=>{
	let query = {};
	if(req.query.specie){
		query.species = {$regex: req.query.specie};
	}
	if(req.query.trait){
		query['traits'] = {$regex: req.query.trait};
	}
	if(req.query.gender){
		query.gender={$regex: req.query.gender};
	}
	if(Object.keys(query).length==0){
		res.json({});
	}
	else{
		Animal.find(query,(err,animals)=>{
			if(err){
				res.type('html').status(500);
				res.send('Error: '+err);
			}else if(animals.length==0){
					res.json({})
			}else{
				let animales=[];
				animales=animals.map((animal)=>{
					return {name:animal.name,
					 species:animal.species,
					 breed:animal.breed,
					 gender:animal.gender,
					 age:animal.age}
				});
				res.json(animals);

			}
		});
	}


});

app.use('/', (req, res) => {
	
	res.json({ msg : 'It works!' });
});



app.listen(3000, () => {
	console.log('Listening on port 3000');
    });



// Please do not delete the following line; we need it for testing!
module.exports = app;
