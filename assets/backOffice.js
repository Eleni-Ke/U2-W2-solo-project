const url = "https://striveschool-api.herokuapp.com/api/movies/";

const par = new URLSearchParams(location.search);
const id = par.get("id");
console.log(id);
const optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDRlM2U3MzczODAwMTUzNzQzYzAiLCJpYXQiOjE2NzQyMDc3MzMsImV4cCI6MTY3NTQxNzMzM30.to8xw5276ON8nubNuoIbjjMKcCf0_u7YArqoOSEGGDo",
  },
};

window.onload = async () => {
  try {
    let containerNode = document.querySelector("#movieToEdit");
    if (id !== null) {
      console.log("id recognised");
      getMovieToEdit();
    } else {
      containerNode.innerHTML = `
      <div class="noMovieMessage row  mt-5 d-flex justify-content-center align-items-center p-3">
        <p>Please go back and choose a movie to edit.</p>
        <a class="btn link" id="backToMenu" href="./index.html">To Menu</a>
      </div>`;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieToEdit = async () => {
  try {
    const response = await fetch(url + "movies" / +id, optionsGet);
    const movieToEdit = await response.json();
    console.log(movieToEdit), showMovieToEdit(movieToEdit);
  } catch (error) {
    console.log(error);
  }
};

const showMovieToEdit = (movie) => {
  let containerNode = document.querySelector("#movieToEdit");
  const { name, description, category, imageUrl } = movie;
  containerNode.innerHTML = `
    <div class="col card">
        <img src="${imageUrl}" class="card-img-top" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${category}</p>
            <p class="card-text">${description}</p>
            <button class="btn btn-warning" onclick="">Edit</button>
            <button class="btn btn-danger" onclick="deleteMovie()">Delete</button>
        </div>
    </div>`;
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
