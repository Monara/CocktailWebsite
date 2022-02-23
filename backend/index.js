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

app.get('/getTitles', (req, res) => {
	conn.query("SELECT title FROM cocktail_list", function(error, results) {
		if (error) throw error;
		res.send(results.map(item => item.title)); 
	});
});

app.get('/getTags', (req, res) => {
	conn.query("SELECT tag_en FROM cocktail_tags", function(error, results) {
		if (error) throw error;
		res.send(results.map(item => item.tag_en)); 
	});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
