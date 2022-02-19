const mysql = require('mysql');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const conn = mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: '',
	database: 'cocktails' 
});

conn.connect(function(err){
	if (err) throw err;
	console.log('Connected to database....');
});

app.get('/search', (req, res) => {
  conn.query("SELECT * FROM cocktail_list", function(error, results) {
      if (error) throw error;
      res.send(results);
      
  });    
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
