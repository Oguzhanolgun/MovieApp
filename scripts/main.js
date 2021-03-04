import data from "./data.js";
import {
    searchMovieByTitle,
    makeBgActive
} from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const {
            root,
            searchInput,
            searchForm,
            yearHandler,
            yearSubmitter,
            genreSubmitter,
            genreHandler,
        } = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");

        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
        this.$genreSubmitter = document.getElementById(genreSubmitter);
        this.genreHandler = genreHandler;
    }

    createMovieEl(movie) {
        const {
            image,
            title,
            genre,
            year,
            id
        } = movie;
        return `<tr data-id="${id}" data-year="${year}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`;
    }
    //This homework is a production of the collaboration with İrem Kenar
    
    //To create year radio buttons dynamically
    createYearRadioBtn(year, yearCount) {
        return `<div class="form-check">
            <input class="form-check-input" type="radio" name="year" id = ${year}  value=${year}>
               <label class="form-check-label" for=${year}>
                ${year} (${yearCount})
              </label>
               </div>`;
    }
    //To insert year with number to radio buttons on html

    addToRadioBtn(content) {
        const $el = document.getElementById("filter-by-year");
        //
        $el.insertAdjacentHTML("afterbegin", content);
    }


    //To create genre check buttons dynamically
    createGenreCheckBtn(genre, genreCount) {
        return `<div class="form-check">
             <input class="form-check-input" type="checkbox" id="genre-${genre}" name="genre" value=${genre}>
               <label class="form-check-label" for="genre-${genre}">
                ${genre} (${genreCount})
                </label>
    </div>`;
    }

    // To insert genre with number check buttons on html
    addToCheckBtn(content) {
        const $el = document.getElementById("filter-by-genre");
        $el.insertAdjacentHTML("afterbegin", content);
    }

    //To create a movie object that includes only years and genre from data.js
    createMovieObjects() {
        const movieObj = {
            sortByYear : {},
            sortByGenre : {}
        };
        return movieObj;
    }

    //To bind events for creation and insertion of radio and check buttons to html
    putBtnsInHtml() {
        const movieObj = this.createMovieObjects();

        for (let i = 0; i < data.length; i++) {
            if (!movieObj.sortByYear[data[i].year]) {
                movieObj.sortByYear[data[i].year] = 1;
            } else {
                movieObj.sortByYear[data[i].year]++;
            }

            if (!movieObj.sortByGenre[data[i].genre]) {
                movieObj.sortByGenre[data[i].genre] = 1;
            } else {
                movieObj.sortByGenre[data[i].genre]++;
            }
        }

        console.log(movieObj);

        for (let key in movieObj.sortByYear) {
            const $radioBtn = this.createYearRadioBtn(key, movieObj.sortByYear[key]);
            
            this.addToRadioBtn($radioBtn);
        }

        for (let key in movieObj.sortByGenre) {
            const $radioBtn = this.createGenreCheckBtn(
                key,
                movieObj.sortByGenre[key]
            );
            this.addToCheckBtn($radioBtn);
        }

    }

    fillTable() {
        /* const moviesHTML = data.reduce((acc, cur) => {
                return acc + this.createMovieEl(cur);
            }, "");*/
        const moviesArr = data
            .map((movie) => {
                return this.createMovieEl(movie);
            })
            .join("");
        this.$tbodyEl.innerHTML = moviesArr;
    }

    reset() {
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        });
    }

    handleSearch() {
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data
                .filter((movie) => {
                    return searchMovieByTitle(movie, searchValue);
                })
                .forEach(makeBgActive);
                this.clearSearchInput();
        });
    }
    //To clear input value after each search event
    clearSearchInput() {
        this.$searchInput.value = "";
    }

    handleYearFilter() {
        this.$yearSubmitter.addEventListener("click", () => {
            //To control any future additions
            if(!this.yearHandler === "year") {
                return;
            }
            this.reset();
            const selectedYear = document.querySelector(
                `input[name='${this.yearHandler}']:checked`
            ).value;

            const matchedMovies = data
                .filter((movie) => {
                    return movie.year === selectedYear;
                })
                .forEach(makeBgActive);
        });
    }

    handleGenreFilter() {
        this.$genreSubmitter.addEventListener("click", () => {
            //To control any future additions
            if (!this.genreHandler == "genre") {
                return;
            }

            this.reset();
            const selectedGenres = Array.from(document.querySelectorAll(
                `input[name="${this.genreHandler}"]:checked`
              )).map((checkbox) => checkbox.value);

              const mathedGenres = data.filter((movie) => {
                  console.log(movie.genre);
                  return selectedGenres.includes(movie.genre);
              }).forEach(makeBgActive);

            // 2.Yöntem
            // const checkboxes = document.querySelectorAll(`input[name="${this.genreHandler}"]:checked`);
            // console.log(checkboxes)
            // checkboxes.forEach(cur => {
            //     const matchedGenres = data.filter(movie => {
            //         return movie.genre === cur.value;
            //     }).forEach(makeBgActive)

            // })
        });
    }

   

    init() {
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.putBtnsInHtml();
        this.handleGenreFilter();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    yearSubmitter: "yearSubmitter",
    genreSubmitter: "genreSubmitter",
    genreHandler: "genre",
});

myMoviesApp.init();

const addMinutesToDate = (date, minutes) => {
    const dateTimestamp = date.getTime();
    console.log(dateTimestamp);
    const minutesTimestamp = minutes * 60000;
    console.log(minutesTimestamp);
    return new Date(dateTimestamp + minutesTimestamp);
  };

  addMinutesToDate(new Date, 15);
  
 const getRemainingDate = (date) => {
    const total = Date.parse(date) - Date.parse(getNow());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, seconds, minutes };
  };

  

