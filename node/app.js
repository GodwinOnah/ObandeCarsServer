const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');




const postgres=knex({//connecting to database using knex
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'Godwin',
    password : '',
    database : 'DataB'
  }
});


postgres.select('*').from('customerdetails').then(data=>{//selecting from database
		console.log(data);

})



const app=express();

app.use(bodyParser.json());
app.use(cors());




// const myDatabese={
// 		users:[
// 		{
// 				id: '1',
// 				name: 'Godwin',
// 				email: 'obande@gmail.com',
// 				password:'1234',
// 				entries:0,
// 				joined: new Date()

// 		},

// 		{
			
// 				id: '2',
// 				name: 'Sam',
// 				email: 'sam@gmail.com',
// 				password:'4321',
// 				entries:0,
// 				joined: new Date()

// 		}


// ]}




app.get('/',(req,res)=>{

		return res.send(myDatabese.users);
})








app.post('/login',(req,res)=>{//logging in a user

	db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data=>{
		const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
		if(isValid){

		return	db.select('*').from('customerdetails').where('email','=',req.body.email)
			.then(user=>{

				res.json(user[0])
			})

			.catch(err=>res.status(400).json('Not registered'))
		}
		else{res.status(400).json('Wrong credencials'}
})

	.catch(err=>res.status(400).json('Wrong credencials'))

	})









app.post('/singup',(req,res)=>{//registering a user

	const hash=bcrypt.hashsync(req.body.password);

	db.transaction(trx=>{

		trx.insert({

			hash:hash,
			email:req.body.email  })

		.into('login')
		.returning('email')
		.then(loginEmail=>{

		return trx('customerdetails')
				.returnning('*').

				insert({
						
						name: req.body.name,
						phoe:,req.body.phone,
						email: req.body.email,
						address: req.body.address,
						password:req.body.password
						// entries:0,
						// joined: new Date()

				}).then(user=>{

			res.json(user[0]);

		})
		
		}).then(trx.commit)

		.catch(trx.rollback)

	})

	.catch(err=>res.status(400).json('Not registered'))

})






app.get('/profile/:id',(req,res)=>{//using Id to fetch user

		db.select('*').from('CarsDatabase')
		.where({req.params.id})
		.then(user=>{

			if(user.length){
			res.json(user[0])
				}else{
						res.status(400).json('Not found')

				}

		}).catch(err=>res.status(400).json('erro getting user'))

	})








	// myDatabese.users.forEach(user=>{

	// 	if(user.id===req.params.id){

	// 		found=true;

	// 		return res.json(user);

		

		



app.post('/image',(req,res)=>{//Calculating entries after adding image



	db('CarsDatabase').where('id','=',req.body.id)
	.increament('entries',1)
	.returning('enteries')
	.then(entries=>{

			res.json(entries[0]);
	}).catch(err=>res.status(400).json('erro getting user'))
		})




		
	// myDatabese.users.forEach(user=>{

	// 	if(user.id===req.params.id){

	// 		found=true;
	// 		user.entries++;

	// 		return res.json(user.entries);

	// 	}
		
	

		

	






app.listen(3001,function(){

console.log("Sever running at port: 3001");

});