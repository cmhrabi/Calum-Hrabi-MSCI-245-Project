let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});

	connection.end();
});

app.get('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT M.*, SR.reviewScore, SR.reviewContent
		FROM (SELECT DISTINCT M.*, SD.director_name
		FROM (SELECT * FROM movies WHERE name LIKE ('%')) AS M,
			(SELECT MD.movie_id, concat(D.first_name, ' ', D.last_name) as director_name FROM movies_directors AS MD, directors AS D WHERE concat(D.first_name, ' ', D.last_name) LIKE ('%') AND MD.director_id=D.id) AS SD,
			(SELECT R.movie_id FROM roles AS R, actors AS A WHERE CONCAT(A.first_name, ' ' , A.last_name) LIKE ('%') AND R.actor_id=A.id) AS SA
		WHERE M.id=SD.movie_id And M.id=SA.movie_id 
		ORDER BY M.id) AS M
	LEFT JOIN (SELECT movieID, AVG(reviewScore) AS reviewScore, group_concat(reviewContent, '') AS reviewContent FROM Review Group BY movieID) AS SR
	ON M.id = SR.movieID;`;
	console.log(sql);

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({express: string });
	});

	connection.end
});

app.get('/api/getReviews', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `SELECT M.*, SR.reviewTitle, SR.reviewID
		FROM (SELECT DISTINCT M.*, SD.director_name
		FROM (SELECT * FROM movies WHERE name LIKE ('%')) AS M,
			(SELECT MD.movie_id, concat(D.first_name, ' ', D.last_name) as director_name FROM movies_directors AS MD, directors AS D WHERE concat(D.first_name, ' ', D.last_name) LIKE ('%') AND MD.director_id=D.id) AS SD,
			(SELECT R.movie_id FROM roles AS R, actors AS A WHERE CONCAT(A.first_name, ' ' , A.last_name) LIKE ('%') AND R.actor_id=A.id) AS SA
		WHERE M.id=SD.movie_id And M.id=SA.movie_id 
		ORDER BY M.id) AS M
	LEFT JOIN (SELECT movieID, group_concat(reviewTitle, '') AS reviewTitle, group_concat(reviewID, '') AS reviewID FROM Review Group BY movieID) AS SR
	ON M.id = SR.movieID;`;
	console.log(sql);

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({express: string });
	});

	connection.end
});

app.post('/api/searchMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	let movieName = req.body.movieName
	let directorName = req.body.directorName
	let actorName = req.body.actorName
	console.log("It is here")

	let sql = "";

	sql = `SELECT M.*, SR.reviewScore, SR.reviewContent
			FROM (SELECT DISTINCT M.*, SD.director_name
				FROM (SELECT * FROM movies WHERE name LIKE (?)) AS M,
					(SELECT MD.movie_id, concat(D.first_name, ' ', D.last_name) as director_name FROM movies_directors AS MD, directors AS D WHERE concat(D.first_name, ' ', D.last_name) LIKE (?) AND MD.director_id=D.id) AS SD,
					(SELECT R.movie_id FROM roles AS R, actors AS A WHERE CONCAT(A.first_name, ' ' , A.last_name) LIKE (?) AND R.actor_id=A.id) AS SA
				WHERE M.id=SD.movie_id And M.id=SA.movie_id 
				ORDER BY M.id) AS M
			LEFT JOIN (SELECT movieID, AVG(reviewScore) AS reviewScore, group_concat(reviewContent, '') AS reviewContent FROM Review Group BY movieID) AS SR
			ON M.id = SR.movieID;`
	console.log(sql);
	let data = [movieName + '%', directorName + '%', actorName + '%'];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if(error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end
});

app.post('/api/getReview', (req, res) => {
	let connection = mysql.createConnection(config);

	let reviewID = req.body.reviewID
	console.log("It is here")

	let sql = 'SELECT reviewContent From Review WHERE reviewID=?';
	console.log(sql);
	let data = [reviewID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if(error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end
});

app.post('/api/editReview', (req, res) => {
	let connection = mysql.createConnection(config);

	let reviewID = req.body.reviewID
	let reviewContent = req.body.reviewContent
	let reviewRating = req.body.reviewRating
	console.log("It is here")

	let sql = 'UPDATE Review SET reviewContent=?, reviewScore=? WHERE reviewID=?';
	console.log(sql);
	let data = [reviewContent, reviewRating, reviewID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if(error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end
});

app.post('/api/deleteReview', (req, res) => {
	let connection = mysql.createConnection(config);

	let reviewID = req.body.reviewID
	console.log("It is here")

	let sql = 'DELETE FROM Review WHERE reviewID=?';
	console.log(sql);
	let data = [reviewID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if(error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end
});

app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);

	let reviewTitle = req.body.reviewTitle
	let reviewContent = req.body.reviewContent
	let reviewScore = req.body.reviewScore
	let movieID = req.body.movieID
	console.log("It is here")

	let sql = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, movieID, userID) VALUES (?, ?, ?, ?, 1)';
	console.log(sql);
	let data = [reviewTitle, reviewContent, reviewScore, movieID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if(error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
