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
	conn.query("SELECT cocktail_id, title FROM cocktail_list", function(error, results) {
		if (error) throw error;
		res.send(results);
	});
});

app.get('/getTags', (req, res) => {
	conn.query("SELECT tag_id, tag_en FROM cocktail_tags", function(error, results) {
		if (error) throw error;
		res.send(results); 
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
	var cocktail = req.query.cocktail;
	var tag = req.query.tag;
	var vegan = req.query.vegan;
	var short = req.query.short;

	if (cocktail != null) {
		sql_statement += " WHERE title ='" + cocktail.replace(/'/g, "''") + "'";  /*if searching by title, ignore other parameters */
	} 

	else {
		if (tag != null) {
			sql_statement += " JOIN tags_and_cocktails ON cocktail_list.cocktail_id = tags_and_cocktails.cocktail_id JOIN cocktail_tags ON tags_and_cocktails.tag_id = cocktail_tags.tag_id WHERE cocktail_tags.tag_en = '" + tag.replace(/'/g, "''") + "'";
			statementCount++;
		}

		if (vegan != null) {
			if(statementCount > 0) {
				sql_statement += " AND cocktail_list.vegan =" + vegan;
			}
			else {	
				sql_statement += " WHERE cocktail_list.vegan =" + vegan;
			}
			statementCount++;	
		}
		
		if (short != null) {
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
