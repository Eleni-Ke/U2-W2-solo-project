const url = "https://striveschool-api.herokuapp.com/api/movies/";

const par = new URLSearchParams(location.search);
const id = par.get("id");
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
    if (id !== null) {
      console.log(id);
      showEditMovieSection();
    } else {
      getMoviesAndGenre();
    }
  } catch (error) {
    console.log(error);
  }
};

// list of movies

const getMoviesAndGenre = async () => {
  try {
    let response = await fetch(url, optionsGet);
    genreArr = await response.json();
    console.log(genreArr);
    genreArr.forEach(async (genre) => {
      let res = await fetch(url + genre, optionsGet);
      let movieArr = await res.json();
      console.log(movieArr);
      displayMovies(genre, movieArr);
    });
  } catch (error) {
    console.log(error);
  }
};

const displayMovies = async (genre, arr) => {
  try {
    const moviesContainer = document.querySelector("#allMoviesContainer");
    moviesContainer.innerHTML += `
    <h3 class="row mt-5 d-flex justify-content-center genreRowTitle">${genre}</h3>`;
    arr.forEach((movie) => {
      moviesContainer.innerHTML += `
      <div class="row justify-content-center">
          <img src="${movie.imageUrl}" alt="picture of movie" class="col-2 movieToEditImg" />
          <h6 class="col-4">${movie.name}</h6>
          <div class="col-3 offset-2 btn-section">
            <a class="btn btn-light" href="./backOffice.html?id=${movie._id}" >Edit</a>
            <button class="btn btn-light" onclick="deleteMovie('${movie._id}' )">
              Delete
            </button>
          </div>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async (id) => {
  console.log(id);

  try {
    let res = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo",
      },
    });
    if (res.ok) {
      alert("ok");
      location.reload();
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const addMovie = async () => {
  try {
    const eventToSend = {
      name: document.querySelector("#movieName").value,
      description: document.querySelector("#movieDescription").value,
      category: document.querySelector("#movieCategory").value,
      imageUrl: document.querySelector("#movieImageUrl").value,
    };
    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(eventToSend),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo",
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      alert("success!");
      window.location.href = "./index.html";
    } else {
      alert("Oh no something went wrong...");
    }
  } catch (error) {
    console.log(error);
  }
};

// edit movie

const showEditMovieSection = async () => {
  const addMovie = document.querySelector("#addMovie");
  addMovie.innerHTML = "";
  const moviesContainer = document.querySelector("#allMoviesContainer");
  try {
    moviesContainer.innerHTML = `
    <h3 class="text-center">Edit movie here</h3>
    <form onsubmit="editMovie(); return false" class="editMovieForm">
              <div class="form-group ">
                <label for="movieToEditName">Movie Name:</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="movieToEditName"
                  placeholder="Name"
                />
              </div>
              <div class="form-group ">
                <label for="movieToEditDescription">Description:</label>
                <textarea
                  class="form-control"
                  required
                  id="movieToEditDescription"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group  dropdown">
                <label for="movieToEditCategory">Category:</label>
                <select
                  name="category"
                  class="form-control"
                  id="movieToEditCategory"
                  required
                >
                  <option value="">--Please choose an option--</option>
                  <option value="horror">Horror</option>
                  <option value="comedy">Comedy</option>
                  <option value="drama">Drama</option>
                  <option value="action">Action</option>
                  <option value="musical">Musical</option>
                  <option value="thriller">Thriller</option>
                </select>
              </div>
              <div class="form-group ">
                <label for="movieToEditImageUrl">Movie Image Link:</label>
                <input
                  type="text"
                  class="form-control"
                  id="movieToEditImageUrl"
                  required
                />
              </div>
              <button class="btn btn-primary mx-auto">Save Movie</button>
            </form>`;
  } catch (error) {
    console.log(error);
  }
};
