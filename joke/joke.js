function getRandomJoke(jokes) {
    fetch('https://official-joke-api.appspot.com/jokes/random')
  .then(response => response.json())
  .then(data => console.log(data));
}