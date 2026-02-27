fetch("https://v2.jokeapi.dev/joke/Programming")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

const url = "https://v2.jokeapi.dev/joke/Programming";
const response = await fetch(url);
const data = await response.json();
console.log(data);