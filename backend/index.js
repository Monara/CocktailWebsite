/**Needs more refactoring */
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
const getAutocompleteResults = (res, column, table) => {
	conn.query(`SELECT id, ${column} FROM ${table}`, function(error, results) {
		if (error) throw error;
		res.send(results);
	});
}

app.get('/api/getTitles', (_, res) => getAutocompleteResults(res, "title", "cocktail_list"));
app.get('/api/getTitlesLT', (_, res) => getAutocompleteResults(res, "title_lt", "cocktail_list"));
app.get('/api/getTags', (_, res) => getAutocompleteResults(res, "tag_en", "cocktail_tags"));
app.get('/api/getTagsLT', (_, res) => getAutocompleteResults(res, "tag_lt", "cocktail_tags"));

/*get random cocktail so page isn't empty*/
app.get('/api/getRand', (_, res) => {
	conn.query("SELECT * FROM cocktail_list ORDER BY RAND() LIMIT 1", function(error, results) {
		if (error) throw error;
		res.send(results); 
	});
});

/*main cocktail search */
app.get('/api/search', (req, res) => { /*currently works by taking id from user selection so no free user input. Parametrized query better if using user input (titles, tags) */

	const cocktail = req.query.cocktail;
	const tag = req.query.tag;
	const vegan = req.query.vegan;
	const short = req.query.short;
	const query = "SELECT * FROM cocktail_list";

	if (cocktail != null) {
		 /*if searching by title, ignore other parameters */
		conn.query("SELECT * FROM cocktail_list WHERE id=?", [cocktail], function(error, results) {if (error) throw error; res.send(results);});    
	} 
	else if (tag != null) {

		if (tag != null && vegan != null && short != null) {
			conn.query("SELECT * FROM cocktail_list JOIN tags_and_cocktails ON cocktail_list.id = tags_and_cocktails.cocktail_id WHERE tags_and_cocktails.tag_id = ? AND cocktail_list.vegan=1 AND cocktail_list.ingredient_count <= 3", [tag], function(error, results) {
				if (error) throw error; res.send(results);}); 
		}
		else if (tag != null && vegan != null ) {
			conn.query("SELECT * FROM cocktail_list JOIN tags_and_cocktails ON cocktail_list.id = tags_and_cocktails.cocktail_id WHERE tags_and_cocktails.tag_id = ? AND cocktail_list.vegan=1", [tag], function(error, results) {
				if (error) throw error; res.send(results);}); 
		}
		else if (tag != null && short != null) {
			conn.query("SELECT * FROM cocktail_list JOIN tags_and_cocktails ON cocktail_list.id = tags_and_cocktails.cocktail_id WHERE tags_and_cocktails.tag_id = ? AND cocktail_list.ingredient_count <= 3", [tag], function(error, results) {
				if (error) throw error; res.send(results);}); 
		}
		else {
			conn.query("SELECT * FROM cocktail_list INNER JOIN tags_and_cocktails ON cocktail_list.id = tags_and_cocktails.cocktail_id WHERE tags_and_cocktails.tag_id = ?", [tag], function(error, results) {
				if (error) throw error; res.send(results);}); 
		}
	}	
	
	else if (vegan != null || short != null) {

		if (vegan != null && short != null) { query += " WHERE cocktail_list.vegan=1 AND cocktail_list.ingredient_count <= 3"}
		else if (vegan != null) { query += " WHERE cocktail_list.vegan=1"}
		else if (short != null) { query += " WHERE cocktail_list.ingredient_count <= 3"}

		conn.query(statement, function(error, results) {
			if (error) throw error;
			res.send(results);  
		}); 
	}
	
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
