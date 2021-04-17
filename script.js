const API_KEY = "api_key=e9b2293ddd17a83e57b4b31a89fb012f"; //api key from tmdb
const BASE_URL = "https://api.themoviedb.org/3"; //base url common for all urls
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY; //our api url
const IMG_URL = "https://image.tmdb.org/t/p/w500"; //image base url
const searchURL = BASE_URL + "/search/movie?" + API_KEY; //search url

const main = document.getElementById("main"); //getting main tag elements from html
const form = document.getElementById("form"); //getting form tag elements from html
const search = document.getElementById("search"); //getting search tag elements from html

getMovies(API_URL); //calling the get movies function

//function to get movies from api
function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            showMovies(data.results);
        });
}

//function to show movies from results
function showMovies(data) {
    main.innerHTML = "";

    data.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
             <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        
        `;

        main.appendChild(movieEl);
    });
}

//fucntion to get colour for ratings
function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 6.5) {
        return "orange";
    } else {
        return "red";
    }
}

//for searching a movie
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + "&query=" + searchTerm);
    } else {
        getMovies(API_URL);
    }
});