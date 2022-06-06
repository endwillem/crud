import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    });
  });

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: movieReview
    });
    
    setMovieList([...movieReviewList, {
        movieName: movieName,
        movieReview: movieReview,
      }]);
      setNewReview("");
  };

  const deleteReview = (movieId) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieId}`);
  };
  
  const updateReview = (val) => {
    Axios.put('http://localhost:3001/api/update', {
      id: val.id,
      review: newReview,
    });
  };

  return (
    <div className="App">
      <h1>CRUD APP</h1>

      <div className="form">
        <label>Movie name:</label>
        <input type="text" name="movieName" onChange={(e) => {
            setMovieName(e.target.value)
          }}/>
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => {
            setMovieReview(e.target.value)
          }} />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div key={val.id} className="card">
              <h1>{val.movie_name} </h1>
              <p>{val.movie_review}</p>

              <button onClick={() => {deleteReview(val.id)}}>Delete</button>

              <input type="text" onChange={(e) => {
                setNewReview(e.target.value)
              }}/>
              <button onClick={() => {updateReview(val)}}>Update</button>
            </div>
          )          
        })}
      </div>
    </div>
  );
}

export default App;
