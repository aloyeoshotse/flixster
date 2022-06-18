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
var page = 1;
var mainPage;
//var year; //year the movie was released

//Filter Variables
//https://developers.themoviedb.org/3/movies/get-movie-changes --> movie database source
//var start_date;
//var end_date;
//var movie_id;


//functions for search input
async function getMovieData(input) { //add message for no search value
    /*this function fetches uses the user input in order to fetch the search term from the 
    movie database api and converts it into a json which is passed into displayMovie()*/
    try { 
        let url;
        //let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${input}&page=${page}`;;
        if (mainPage && userInput.value == "") {
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=517461a5845ab1a8b80623111b4006fc&language=en-US&page=${page}`; //movie database url with unique api key
        }  else {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${input}&page=${page}`; //movie database url with unique api key
            mainPage = false;
        }
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
    if (!mainPage) {closeSubmitButton.removeAttribute("hidden");} //this closes out the search
        //loadMoreMovies.removeAttribute("hidden")
    const movieLink = "https://www.themoviedb.org/t/p/w440_and_h660_face"; //movie DB image link
    // movieGrid.innerHTML = ``;
    responseData.results.map((item) => {
        movieGrid.innerHTML +=  `
        <span class="movie-card">
            <img id="movie-poster" src=${movieLink + item.poster_path}>
            <div class="movie-title">${item.title}</div>
            <div class="movie-date">${item.release_date}</div>
            <span div="movie-votes">🌟${item.vote_average}</span>
            <div>
                <div id="movie-description">${item.overview}</div>
            </div>
        </span>

        <div class="space">
        </div>
    `        
        console.log(item.title)
        console.log(typeof(item.poster_path));
        console.log(item.poster_path);
    })
}

function handleFormSubmit(event,key) {
    console.log(mainPage)
    console.log(userInput.value)
    // event.preventDefault();
    if (!mainPage && userInput.value == "") {
        movieGrid.innerHTML = ``
        setTimeout(() => movieGrid.innerHTML = `
        <div id=search-error>There are no search results that matched you search.</div>
        `, 100)
        closeSubmitButton.removeAttribute("hidden");
        loadMoreMovies.hidden = true;
        return;
    }
    //console.log(userInput.value == "");
    userInputElem = encodeURI(userInput.value);
    // if (!mainPage && userInputElem == "") {
    //     mainPage = false;
    //     movieGrid.innerHTML += 
    // }
    //console.log(userInput);
    movieGrid.innerHTML = ``;
    getMovieData(userInputElem);
}

function removeHiddenX() {
    //removes the X button when it is clicked
    mainPage = true;
    window.location.reload();
    closeSubmitButton.hidden = true; 
}

function loadMore() {
    //removes the more button when it is clicked
    page++;
    let input = userInput.value
    getMovieData(input);
}


form.addEventListener('submit',(event) => {
    mainPage = false;
    //console.log(mainPage);
    event.preventDefault();
    handleFormSubmit(event);
    })

window.addEventListener('load', (loadevent) => {
    mainPage = true;
    //console.log(mainPage);
    loadMoreMovies.removeAttribute("hidden");
    handleFormSubmit(loadevent);
    })
// console.log(mainPage);
// console.log(userInput.value == "");

//want to load more on current movie page... will need to call currentmoviegetter function
    //from the loadmore function