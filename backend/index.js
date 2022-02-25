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

/*main cocktail search */
app.get('/search', (req, res) => {
	var sql_statement = "SELECT * FROM cocktail_list"; /* nothing marked: send all*/
	var statementCount = 0;

	if (req.query.cocktail != null) {
		sql_statement += " WHERE cocktail_id = " + req.query.cocktail; /*if searching by title, ignore other parameters */
	}

	else {
		if (req.query.tag != null) {
			sql_statement += " INNER JOIN tags_and_cocktails ON cocktail_list.cocktail_id = tags_and_cocktails.cocktail_id WHERE tags_and_cocktails.tag_id = " + req.query.tag;
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
