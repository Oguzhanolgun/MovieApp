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

    createYearRadioBtn(year, yearCount) {
        return `<div class="form-check">
            <input class="form-check-input" type="radio" name="year"  value=${year}>
               <label class="form-check-label" for=${year}>
                ${year} (${yearCount})
              </label>
               </div>`;
    }

    addToRadioBtn(content) {
        const $el = document.querySelectorAll(".box")[1];
        //
        $el.insertAdjacentHTML("afterbegin", content);
    }

    putRadioBtnInHtml() {
        // for(let i = 0; i < data.length; i++) {
        //      this.addToRadioBtn(this.createYearRadioBtn(data[i]));
        // }
    }

    createGenreCheckBtn(genre, genreCount) {
        return `<div class="form-check">
             <input class="form-check-input" type="checkbox" id="genre-${genre}" name="genre" value=${genre}>
               <label class="form-check-label" for="genre-${genre}">
                ${genre} (${genreCount})
                </label>
    </div>`;
    }

    addToCheckBtn(content) {
        const $el = document.querySelectorAll(".box")[2];
        console.log($el);
        $el.insertAdjacentHTML("afterbegin", content);
    }

    putCheckBtnInHtml() {
        const movieObj = {
            sortByYear: {},
            sortByGenre: {},
        };

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

        console.log(movieObj);
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
        });
    }

    handleYearFilter() {
        this.$yearSubmitter.addEventListener("click", () => {
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
        this.putCheckBtnInHtml();
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

// 1. Year ve genre secenekleri mevcut datanin icindeki alanlardan olusmali ve yanlarina parantes icinde sayilari yazilmali.

// Ornegin data icerisinde 2 adet Action 3 adet Drama filmi var ise secenekler.

// - Action(2)
// - Drama(3)

// seklinde olmali

// 2. Genre'ye gore filtereleme yapalim. Burdaki filtreleme year'dan farkli olarak
// coklu secim yapmaya da izin veriyor. Action ve drama secili ise hem action hem drama filmleri tabloda background rengi farkli olarak gosterilmeli.

// #### Bonus
// - search yapildiktan sonra search yapilan inputu bosaltalim.


