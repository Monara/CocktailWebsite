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

/*functions for autosuggestions */
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

/*get random cocktail so page isn't empty*/
app.get('/getRand', (req, res) => {
	conn.query("SELECT * FROM cocktail_list ORDER BY RAND() LIMIT 1", function(error, results) {
		if (error) throw error;
		res.send(results); 
	});
});

/*main cocktail search */
app.get('/search', (req, res) => {
	var sql_statement = "SELECT * FROM cocktail_list"; /* nothing marked: send all*/
	var statementCount = 0;

	if (req.query.cocktail != null) {
		sql_statement += " WHERE title = '" + req.query.cocktail + "'"; /*if searching by title, ignore other parameters */
	} 

	else {
		if (req.query.tag != null) {
			sql_statement += " JOIN tags_and_cocktails ON cocktail_list.cocktail_id = tags_and_cocktails.cocktail_id JOIN cocktail_tags ON tags_and_cocktails.tag_id = cocktail_tags.tag_id WHERE cocktail_tags.tag_en = '" + req.query.tag + "'";
			statementCount++;
		}

		if (req.query.vegan != null) {
			if(statementCount > 0) {
				sql_statement += " AND cocktail_list.vegan =" + req.query.vegan;
			}
			else {	
				sql_statement += " WHERE cocktail_list.vegan =" + req.query.vegan;
			}
			statementCount++;	
		}
		
		if (req.query.short != null) {
			if(statementCount > 0) {
				sql_statement += " AND cocktail_list.ingredient_count <= 3";
			}
			else { 
				sql_statement += " WHERE cocktail_list.ingredient_count <= 3";
			}
			statementCount++;
		}
	}

		statementCount = 0;
		conn.query(sql_statement, function(error, results) {
			if (error) throw error;
			res.send(results);  
		});    
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
