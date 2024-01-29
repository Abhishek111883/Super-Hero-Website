input = document.querySelector(".inputbar");
searchbutton = document.querySelector(".search-hero");
randombutton = document.querySelector(".get-random");
detailscontainer = document.querySelector(".information");
imagecontainer = document.querySelector(".image");
clearButton = document.querySelector(".clear");
spidermanButton = document.querySelector(".spider");
BatmanButton = document.querySelector(".Batman");
ThorButton = document.querySelector(".Thor");
AquamanButton = document.querySelector(".Aquaman");
const accestoken = "122096612546204324";
const url = `https://superheroapi.com/api.php/${accestoken}/search/`;

// Event listeners
searchbutton.addEventListener("click", () => {
  findDetails(input.value);
});

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    findDetails(input.value);
  }
});
clearButton.addEventListener("click", () => {
  detailscontainer.innerHTML = "";
  imagecontainer.innerHTML = "";
  removeFromLocalStorage();
});

spidermanButton.addEventListener("click", () => {
  findNumberToName(620);
});

BatmanButton.addEventListener("click", () => {
  findNumberToName(70);
});

ThorButton.addEventListener("click", () => {
  findNumberToName(659);
});

AquamanButton.addEventListener("click", () => {
  findNumberToName(38);
});

randombutton.addEventListener("click", () => {
  let randomnumber = Math.floor(Math.random() * 731) + 1;
  findNumberToName(randomnumber);
});

// Function to find superhero details by random number
async function findNumberToName(numberid) {
  try {
    const response = await fetch(
      `https://superheroapi.com/api.php/${accestoken}/${numberid}`
    );
    const data = await response.json();
    console.log(data.name);
    getImageAndContent(data);
    saveToLocalStorage(data);
  } catch (error) {
    console.error("Error fetching superhero data:", error);
  }
}

// Function to save data to local storage
function saveToLocalStorage(data) {
  localStorage.setItem("superheroData", JSON.stringify(data));
}

// Check local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("superheroData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    getImageAndContent(parsedData);
  }
});

// Function to find superhero details by name
async function findDetails(heroname) {
  try {
    const response = await fetch(`${url}${heroname}`);
    const data = await response.json();
    console.log(data.response);
    console.log(data.results);

    if (data.response === "error") {
      console.log("No results found");
      detailscontainer.innerHTML = `<h1>No results found</h1>`;
      imagecontainer.innerHTML = "";
    } else {
      // getImageAndContent(data);
      findId(data.results);
    }
    // findId(data.results);
  } catch (error) {
    console.error("Error fetching superhero details:", error);
  }
}

// Function to find superhero details by ID
function findId(results) {
  if (Array.isArray(results)) {
    if (results.length === 0) {
      console.log("No results found");
      // Handle the case when no results are found
    } else if (results.length === 1) {
      getImageAndContent(results[0]);
    } else {
      for (const element of results) {
        if (element.name.toLowerCase() === input.value.toLowerCase()) {
          console.log(element);
          getImageAndContent(element);
          // Save the result to local storage
          saveToLocalStorage(element);
          // Break out of the loop once a match is found
          break;
        }
      }
    }
  } else {
    console.log("Invalid results format");
    // Handle the case when results is not an array
  }
}

// Function to get image and content and update the UI
function getImageAndContent(element) {
  console.log(element.id);
  imagecontainer.innerHTML = `<img src="${element.image.url}">`;
  detailscontainer.innerHTML = `

    <div class="bio">
      <h1>${element.name}</h1>
      <h3>Biography</h3>
      <p>
        <span class="label">Full Name:</span> ${element.biography["full-name"]} <br>
        <span class="label">Aliases:</span> ${element.biography.aliases[0]} <br>
        <span class="label">Place of Birth:</span> ${element.biography["place-of-birth"]} <br>
        <span class="label">First Appearance:</span> ${element.biography["first-appearance"]} <br>
        <span class="label">Publisher:</span> ${element.biography.publisher}
      </p>
    </div>


    <div class="work">
      <h3>Work</h3>
      <p>
        <span class="label">Base:</span> ${element.work.base} <br>
        <span class="label">Occupation:</span> ${element.work.occupation}
      </p>
    </div>


    <div class="powerstats">
      <h3>Powerstats</h3>
      <p>
        <span class="label">⚔️ Combat:</span> ${element.powerstats.combat} <br>
        <span class="label">🛡️ Durability:</span> ${element.powerstats.durability} <br>
        <span class="label">🧠 Intelligence:</span> ${element.powerstats.intelligence} <br>
        <span class="label">💪 Power:</span> ${element.powerstats.power} <br>
        <span class="label">⚡ Speed:</span> ${element.powerstats.speed} <br>
        <span class="label">💪🏻 Strength:</span> ${element.powerstats.strength}
      </p>
    </div>

    <div class="connection">
      <h3>Connections</h3>
      <p>
        <span class="label">Group Affiliation:</span> ${element.connections["group-affiliation"]} <br>
        <span class="label">Relatives:</span> ${element.connections.relatives}
      </p>
    </div>
    `;
}

// Function to remove data from local storage
function removeFromLocalStorage() {
  localStorage.removeItem("superheroData");
}

// Call this function when you want to remove the stored data
// Example: removeFromLocalStorage();
