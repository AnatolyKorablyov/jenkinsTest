var ObjectID = require('mongodb').ObjectID;



module.exports = function(app, db) {
	app.get('/getclientsdb', (req, res) => {
		db.collection('clients').find().toArray(function (err, items) {
                    res.send(items);
                });
	});
  app.get('/clients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('clients').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
app.post('/clients', (req, res) => {
    const note = { name: req.body.name, alias: req.body.alias, 
    	email: req.body.email, pass: req.body.pass, language: req.body.language,
    	number_customer_license : req.body.number_customer_license, 
    	number_project_license: req.body.number_project_license,
    	license_expiry_date: req.body.license_expiry_date};
    db.collection('clients').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
app.delete('/clients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('clients').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
app.put ('/clients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { name: req.body.name, alias: req.body.alias, 
    	email: req.body.email, pass: req.body.pass, language: req.body.language,
    	number_customer_license : req.body.number_customer_license, 
    	number_project_license: req.body.number_project_license,
    	license_expiry_date: req.body.license_expiry_date};
    db.collection('clients').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
app.get('/getmachinesdb', (req, res) => {
		db.collection('machines').find().toArray(function (err, items) {
                    res.send(items);
                });
	});
app.post('/machines', (req, res) => {
    const note = { name: req.body.name, ip: req.body.ip, 
    	description: req.body.description};
    db.collection('machines').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};