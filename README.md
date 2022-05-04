# WeLoveMovies-backend

Backend for WeLoveMovies application. Setting up the database and building out routes so that users can gain access to data about movies, theaters, and reviews.

### Features

#### Review Routes

- updates an existing review at /reviews/:reviewId
- deletes the review record when given an existing review_id

#### Theater Routes

- shows a list of all theaters, including the 'movies' that each theater is showing

#### Movie Routes

- shows a list of all movies by default
- shows all active movies if `is_showing=true` is provided
- shows movie details when given an existing movie ID
- shows all theaters for a specified movie ID
