//     headers: {
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo"
//     }

const url = "https://striveschool-api.herokuapp.com/api/movies/";
let genreArr = [];

const optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo",
  },
};

window.onload = async () => {
  try {
    let response = await fetch(url, optionsGet);
    genreArr = await response.json();
    showGenres(genreArr);
  } catch (error) {
    console.log(error);
  }
};

const showGenres = async (arr) => {
  const genreDropdown = document.querySelector("#genreDropdown");
  arr.forEach((genre) => {
    if (genre !== "") {
      genreDropdown.innerHTML += `
      <button class="btn dropdown-item" onclick="getMovies('${genre}')">
      ${genre}
      </button>`;
    }
  });
};

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
    if (genre !== "") {
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
        <a href="./backOffice.html" class="btn btn-primary goToBackOffice">More</a>
        </div>
        </div>
        </div>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
