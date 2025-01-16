# movieSearchReview #
Movie Review Application

A full-stack web application that allows users to browse movies, view details, and add reviews. The application uses The Movie Database (TMDB) API for movie data and includes a custom backend for storing and managing user reviews.

## Features

- Browse popular movies from TMDB
- Search for specific movies
- View movie details including descriptions
- Add and view user reviews for each movie
- Star rating system
- Responsive design

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)
- TMDB API for movie data

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

You will also need:
- TMDB API key
- MongoDB Atlas account (or local MongoDB installation)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [your-project-name]
```

2. Install backend dependencies:
```bash
cd movie-review-backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

4. Start the backend server:
```bash
node server.js
```

5. Open the frontend:
- Navigate to the project's root directory
- Open `index.html` in your web browser

## Project Structure

```
project-root/
├── frontend/
│   ├── index.html
│   ├── movieSearchClone.css
│   └── movieSearchClone.js
└── movie-review-backend/
    ├── models/
    │   └── Review.js
    ├── routes/
    │   └── reviews.js
    ├── server.js
    ├── .env
    └── package.json
```

## API Endpoints

### Backend API
- `GET /api/reviews/movie/:movieId` - Get all reviews for a specific movie
- `POST /api/reviews` - Add a new review

### External API
The application uses the following TMDB API endpoints:
- Movie discovery: `https://api.themoviedb.org/3/discover/movie`
- Movie search: `https://api.themoviedb.org/3/search/movie`
- Movie details: `https://api.themoviedb.org/3/movie/{movie_id}`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- MongoDB for the database
- Express.js for the backend framework

## Contact

Your Name - [your-email@example.com]

Project Link: [https://github.com/yourusername/your-repo-name]
