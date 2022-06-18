//differnt endpoint for now playing vs search vs other stuff
//config endpoint --> (look this up)

//DOM Variables
const form = document.querySelector("#search");
const userInput = document.querySelector("#search-input");
const submitButton = document.querySelector("#search-btn");
const closeSubmitButton = document.querySelector("#close-search-btn");
const movieGrid = document.querySelector("#movie-grid");
const movieTitle = document.querySelector(".movie-title");
const moviePoster = document.querySelector("#movie-poster");
const movieVotes = document.querySelector(".movie-votes");
const loadMoreMovies = document.querySelector("#load-more-movies-btn");

//Parameters for Movie Database API 
//https://developers.themoviedb.org/3/search/search-movies --> movie database source
const api = "517461a5845ab1a8b80623111b4006fc"; //api key from the MOVIE DB
var userInputElem; //user input into search bar
//var year; //year the movie was released

//Filter Variables
//https://developers.themoviedb.org/3/movies/get-movie-changes --> movie database source
//var start_date;
//var end_date;
//var movie_id;


//functions to load main page
async function makeCurrentPage(loadevent) {
    loadevent.preventDefault();
    let curr_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=517461a5845ab1a8b80623111b4006fc&language=en-US&page=1"; //movie database url with unique api key
    let curr_data = await fetch(curr_url); //fetching the data from the databse using the url
    var curr_resData = await curr_data.json(); //converting data into something readable for JavaScript
    currDisplayMovies(curr_resData);
    // console.log(curr_data);
    // console.log(curr_resData);
}

function currDisplayMovies(responseData) {
    /*this function takes the api data in json format and generates
    a movie template that will be displayed on the webpage by adding 
    to the html*/
    const currMovieLink = "https://www.themoviedb.org/t/p/w440_and_h660_face"; //movie DB image link
    responseData.results.map((item) => {
        movieGrid.innerHTML += `
        <div class="movie-card">
            <img id="movie-poster" src=${currMovieLink + item.poster_path}>
            <div class="movie-title">${item.title}</div>
            <div class="movie-votes">🌟${item.vote_average}</div>
        </div>
        `        
    }) 
}


//functions for search input
async function getMovieData(input) {
    /*this function fetches uses the user input in order to fetch the search term from the 
    movie database api and converts it into a json which is passed into displayMovie()*/
    try {   
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${input}`; //movie database url with unique api key
        let data = await fetch(url); //fetching the data from the databse using the url
        var resData = await data.json(); //converting data into something readable for JavaScript
        console.log(data);
        console.log(resData);
        displayMovies(resData);
    }
    catch(error) {
        console.log(error);
    }
}

function displayMovies(responseData) {
    /*this function takes the api data in json format and generates
    a movie template that will be displayed on the webpage by adding 
    to the html*/
    closeSubmitButton.removeAttribute("hidden"); //this closes out the search
    loadMoreMovies.removeAttribute("hidden")
    const movieLink = "https://www.themoviedb.org/t/p/w440_and_h660_face"; //movie DB image link
    movieGrid.innerHTML = ``;
    responseData.results.map((item) => {
        movieGrid.innerHTML += `
        <div class="movie-card">
            <img id="movie-poster" src=${movieLink + item.poster_path}>
            <div class="movie-title">${item.title}</div>
            <div class="movie-votes">🌟${item.vote_average}</div>
        </div>
        `
        console.log(item.title)
        console.log(typeof(item.poster_path));
        console.log(item.poster_path);
    })
}

function handleFormSubmit(event) {
    event.preventDefault();
    userInputElem = encodeURI(userInput.value);
    console.log(userInput);
    getMovieData(userInputElem);
}

function removeHiddenX() {
    //removes the X button when it is clicked
    window.location.reload();
    closeSubmitButton.hidden = true; 
    //form.addEventListener('click',(clickevent) => {makeCurrentPage(clickevent);})
}

function removeHiddenMore() {
    //removes the more button when it is clicked
    loadMoreMovies.hidden = true;
}


window.addEventListener('load', (loadevent) => {makeCurrentPage(loadevent)})
form.addEventListener('submit',(event) => {handleFormSubmit(event)})