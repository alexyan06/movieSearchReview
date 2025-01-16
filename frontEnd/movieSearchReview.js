const API_LINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e5e7ddfd6192966a4c475efc68eea3a0&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=e5e7ddfd6192966a4c475efc68eea3a0&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(API_LINK)

function returnMovies(url){
  fetch(url).then(res => res.json())
    .then(function(data){
      console.log(data.results);
      data.results.forEach(element => {
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card");

        const div_row = document.createElement("div");
        div_row.setAttribute("class", "row");

        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("id", "image");

        const title = document.createElement("h3");
        title.setAttribute("id", "title");

        const rating = document.createElement("div");
        rating.setAttribute("class", "rating");

        const stars = (Math.round((element.vote_average / 2) * 10)) / 10;
        const ratingText = "⭐".repeat(stars);

        // Create a container for the description
        const descriptionContainer = document.createElement("div");
        descriptionContainer.setAttribute("class", "description-container");

        const descriptionButton = createDescriptionButton(element.id, descriptionContainer);

        const center = document.createElement("center");

        title.innerHTML = `${element.title}`;
        rating.innerHTML = `${ratingText} (${stars}/5)`;
        image.src = IMG_PATH + element.poster_path;

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_card.appendChild(rating);
        div_card.appendChild(descriptionButton);
        div_card.appendChild(descriptionContainer); // Add the description container
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCH_API + searchItem);
    search.value = "";
  }
});

// Add this function to your existing movieSearchClone.js
async function displayReviews(movieId, container) {
  try {
    const response = await fetch(`http://localhost:5000/api/reviews/movie/${movieId}`);
    const reviews = await response.json();

    const reviewsHtml = reviews.map(review => `
      <div class="review-item">
        <div class="review-rating">Rating: ${"⭐".repeat(review.userRating)}</div>
        <div class="review-comment">${review.comment}</div>
        <div class="review-date">${new Date(review.createdAt).toLocaleDateString()}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="reviews-section">
        <h4>Reviews</h4>
        ${reviewsHtml}
        <div class="add-review-form">
          <h4>Add Review</h4>
          <select class="rating-select">
            ${[1,2,3,4,5].map(num => `<option value="${num}">${num} Stars</option>`).join('')}
          </select>
          <textarea class="review-comment-input" placeholder="Write your review..."></textarea>
          <button class="submit-review-btn">Submit Review</button>
        </div>
      </div>
    `;

    // Add event listener for the submit review button
    const submitBtn = container.querySelector('.submit-review-btn');
    submitBtn.addEventListener('click', async () => {
      const rating = container.querySelector('.rating-select').value;
      const comment = container.querySelector('.review-comment-input').value;

      if (!comment) {
        alert('Please write a review comment');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movieId: movieId,
            movieTitle: document.getElementById('title').textContent,
            userRating: Number(rating),
            comment: comment
          }),
        });

        if (response.ok) {
          // Refresh reviews after posting
          displayReviews(movieId, container);
        } else {
          alert('Error posting review');
        }
      } catch (error) {
        console.error('Error posting review:', error);
        alert('Error posting review');
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    container.innerHTML = '<p>Error loading reviews</p>';
  }
}

// Modify your createDescriptionButton function to include reviews
function createDescriptionButton(movieId, descriptionContainer) {
  const descriptionButton = document.createElement("button");
  descriptionButton.setAttribute("class", "review");
  descriptionButton.textContent = "Show Description & Reviews";
  let contentDisplayed = false;

  descriptionButton.addEventListener("click", () => {
    if (!contentDisplayed) {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e5e7ddfd6192966a4c475efc68eea3a0`)
        .then(res => res.json())
        .then(function(data) {
          descriptionContainer.innerHTML = `
            <div class="movie-description">${data.overview}</div>
            <div class="reviews-container"></div>
          `;
          displayReviews(movieId, descriptionContainer.querySelector('.reviews-container'));
          descriptionButton.textContent = "Hide Content";
          descriptionContainer.style.display = "block";
          contentDisplayed = true;
        });
    } else {
      descriptionButton.textContent = "Show Description & Reviews";
      descriptionContainer.style.display = "none";
      contentDisplayed = false;
    }
  });

  return descriptionButton;
}
