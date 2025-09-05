function showDiv(divId) {
  document.getElementById("homeDiv").style.display = "none";
  document.getElementById("randomDiv").style.display = "none";
  document.getElementById("idDiv").style.display = "none";
  document.getElementById("typeDiv").style.display = "none";
  document.getElementById(divId).style.display = "block";
  if (divId === "homeDiv") {
    document.getElementById("joke").innerHTML = "";
  }
}

function getRandomJoke() {
  fetch("https://official-joke-api.appspot.com/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      const jokeDiv = document.getElementById("joke");
      if (jokeDiv) {
        jokeDiv.innerHTML = `<strong>${data.setup}</strong><br>${data.punchline}`;
      }
    });
}

function getJokesById() {
  const idInput = document.getElementById("jokeId");
  const id = idInput ? idInput.value : "";
  const jokeDiv = document.getElementById("joke");
  if (!id) {
    jokeDiv.innerHTML = "Kérlek, adj meg egy azonosítót!";
    return;
  }
  fetch(`https://official-joke-api.appspot.com/jokes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.setup && data.punchline) {
        jokeDiv.innerHTML = `<strong>${data.setup}</strong><br>${data.punchline}`;
      } else {
        jokeDiv.innerHTML = "Nincs ilyen azonosítójú vicc!";
      }
    })
    .catch(() => {
      jokeDiv.innerHTML = "Hiba történt a keresés során!";
    });
}

function getJokesByType() {
  const typeInput = document.getElementById("jokeType");
  const type = typeInput ? typeInput.value : "";
  if (!type) return;
  fetch(`https://official-joke-api.appspot.com/jokes/${type}/random`)
    .then((response) => response.json())
    .then((data) => {
      const jokeDiv = document.getElementById("joke");
      const joke = Array.isArray(data) ? data[0] : data;
      if (jokeDiv && joke && joke.setup && joke.punchline) {
        jokeDiv.innerHTML = `<strong>${joke.setup}</strong><br>${joke.punchline}`;
      } else if (jokeDiv) {
        jokeDiv.innerHTML = "Nincs ilyen típusú vicc!";
      }
    });
}

window.onload = function () {
  showDiv("homeDiv");
};
