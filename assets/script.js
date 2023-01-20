//     headers: {
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo"
//     }

const url = "https://striveschool-api.herokuapp.com/api/movies/";

const optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo",
  },
};

// index.html
// window.onload = async () => {
//   await getMovies("horror");
// };

const getMovies = async (genre) => {
  try {
    const response = await fetch(url + genre, optionsGet);
    const movies = await response.json();
    showUserMovies(movies, genre);
  } catch (error) {
    console.log(error);
  }
};

const showUserMovies = async (movies, genre) => {
  try {
    const row = document.querySelector("#userMovieRow");
    const genreTitle = document.querySelector("#userShowGenre");
    genreTitle.innerHTML = `<h5>${genre}</h5>`;
    row.innerHTML = "";
    movies.forEach((movie) => {
      row.innerHTML += `
        <div class="col">
            <div class="card">
                <img src="${movie.imageUrl}" alt="${movie.name}"
                />
                <div class="card-body">
                    <p>${movie.description}</p>
                </div>
                <div class="card-footer">
                <a href="./backOffice.html?id=${movie._id}" class="btn btn-primary goToBackOffice">More</a>
                </div>
            </div>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
};
