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

window.onload = () => {
  try {
    if (id !== null) {
      console.log("This is the id:" + id);
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
    console.log("These are the genre:" + genreArr);
    genreArr.forEach(async (genre) => {
      let res = await fetch(url + genre, optionsGet);
      let movieArr = await res.json();

      displayMovies(genre, movieArr);
    });
  } catch (error) {
    console.log(error);
  }
};

const displayMovies = async (genre, arr) => {
  if (genre !== "") {
    try {
      const moviesContainer = document.querySelector("#allMoviesContainer");
      moviesContainer.innerHTML += `
      <h3 class="row d-flex justify-content-center genreRowTitle">${genre}</h3>`;
      arr.forEach((movie) => {
        console.log("These are the ids:", movie._id, movie.name);
        moviesContainer.innerHTML += `
        <div class="row justify-content-center">
        <img src="${movie.imageUrl}" alt="picture of movie" class="col-2 movieToEditImg" />
        <h4 class="col-4 my-auto">${movie.name}</h4>
        <div class="col-3 offset-2 btn-section my-auto">
        <a class="btn btn-warning" href="./backOffice.html?id=${movie._id}" >Edit</a>
        <button class="btn btn-danger" onclick="deleteMovie('${movie._id}' )">
        Delete
        </button>
        </div>
        </div>`;
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteMovie = async (id) => {
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
                  class="form-control"
                  id="movieToEditName"
                  placeholder="Name"
                  required
                />
              </div>
              <div class="form-group ">
                <label for="movieToEditDescription">Description:</label>
                <textarea
                  class="form-control"
                  id="movieToEditDescription"
                  rows="3"
                  required
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
                  <option value="global">--Please choose an option--</option>
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

const editMovie = async () => {
  try {
    const eventToPut = {
      name: document.querySelector("#movieToEditName").value,
      description: document.querySelector("#movieToEditDescription").value,
      category: document.querySelector("#movieToEditCategory").value,
      imageUrl: document.querySelector("#movieToEditImageUrl").value,
    };
    let res = await fetch(url + id, {
      method: "PUT",
      body: JSON.stringify(eventToPut),
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
