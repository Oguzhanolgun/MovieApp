export const searchMovieByTitle = (movie, searchValue) => {
    return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}

const bgColorChoise = (genre) => {
    if (!genre) {
        return;
    }

    const colorEnum = {
        "Action": "#7d7b7b",
        "Drama": "#efd7f7",
        "Crime": "#fc6464",
        "Adventure": "#c0f3bf",
        "Western": "#ebf3bf",
        "Biography": "#63b596"
    }

    return colorEnum[genre];
}

export const makeBgActive = (movie) => {
    const bgColor = bgColorChoise(movie.genre);
    document.querySelector(`tr[data-id='${movie.id}']`).style.background = bgColor;

}