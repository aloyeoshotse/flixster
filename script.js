//DOM Variables
const form = document.querySelector("#search");
const userInput = document.querySelector("#search-input");
const submitButton = document.querySelector("#search-btn");
const closeSubmitButton = document.querySelector("#close-search-btn");
const movieGrid = document.querySelector("#movie-grid");
//const movieCard = document.querySelector(".movie-card");
const movieTitle = document.querySelector(".movie-title");
const moviePoster = document.querySelector("#movie-poster");
const movieVotes = document.querySelector(".movie-votes");
const loadMoreMovies = document.querySelector("#load-more-movies-btn");

//Parameters for Movie Database API
//https://developers.themoviedb.org/3/search/search-movies --> movie database source
const api = "517461a5845ab1a8b80623111b4006fc"; //api key from the MOVIE DB
var userInputElem;
//var year; //year the movie was released

//Filter Variables
//https://developers.themoviedb.org/3/movies/get-movie-changes --> movie database source
//var start_date;
//var end_date;
//var movie_id;


async function getMovieData(input) {
    /*this function fetches uses the user input in order to fetch the search term from the 
    movie database api and converts it into a json which is passed into displayMovie()*/
    try {   
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${input}`; //movie database url with unique api key
        let data = await fetch(url); //fetching the data from the databse using the url
        var resData = await data.json(); //converting data into something readable for JavaScript
        console.log(data);
        console.log(resData);
        displayMovie(resData);
    }
    catch(error) {
        console.log(error);
    }
}

function displayMovie(responseData) {
    /*this function takes the api data in json format and uses createMovieTemplate() to generate
    a movie template that will be displayed on the webpage*/
}

function handleFormSubmit(event) {
    event.preventDefault();
    userInputElem = encodeURI(userInput.value);
    console.log(userInput);
    getMovieData(userInputElem);
}

form.addEventListener('submit',(event) => {handleFormSubmit(event)});