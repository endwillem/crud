const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'superPassword',
    database: 'cruddb',
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {

    const movie_name = req.body.movieName;
    const movie_review = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?)";
    db.query(sqlInsert, [movie_name, movie_review], (err, result) => {});
});

app.delete('/api/delete/:movieId', (req, res) => {
    const id = req.params.movieId;
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
    
    db.query(sqlDelete, id, (err, result) => {
        if(err) console.log(err);
    });
    
})

app.put('/api/update', (req, res) => {
    const id = req.body.id;
    const review = req.body.review;
    const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE id = ?";

    console.log(id, review, sqlUpdate);

    db.query(sqlUpdate, [review, id], (err, result) => {
        if(err) console.log(err);
    })
    
})

app.listen(3001, () => {
    console.log('server draait op poort 3001');
});