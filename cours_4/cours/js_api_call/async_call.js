async function execFetch(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

console.log("First call");
const url = "https://v2.jokeapi.dev/joke/Programming"
execFetch(url);

console.log("Second call");
const url2 = "https://jsonplaceholder.typicode.com/posts/4"
execFetch(url2);

// should show the console.log before the data from fetched calls
console.log("Third call with promise");
Promise.all([execFetch(url), execFetch(url2)]).then((results) => {
    console.log("All calls completed");
    console.log(results);
});