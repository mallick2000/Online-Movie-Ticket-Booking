let movies = [
  {
    name:"WELCOME TO MOVIE SEAT BOOKING SYSTEM",
    image: "./bg.jpg"
  },
  {
    name: "falcon and the winter soldier",
    des:
        "Falcon and the winter soldier are a mismatched duo eho team up for a global adventure that will test their survival skills!",
    image: "./slider 2.png"
  },
  {
    name: "loki",
    des:
      "Loki comes into contact with a mystrerious organization that gives him an ominus ultimatum,either fix the timeline or cease to exit completely!",
    image: "./slider 1.png"
  },
  {
    name: "wanda vision",
    des:
      "Vision  and wanda live a normal life in westview and conceal their superpowers.However,as decades pass by,they start doubting that everything is not what it seems!",
    image: "./slider 3.png"
  },
  {
    name: "raya and the last dragon",
    des:
      "Raya,a warrior,sets out to track down sisu.a dragon,who transferred all her powers into a magical gem which is now scattered all over the kingdom of kumandra,dividing its people!",
    image: "./slider 4.png"
  },
  {
    name: "luca",
    des:
      "Luca,a sea monster,befriends Alberto,another one of his kind who takes him on a land adventure.He experiences an exciting summer while keeping his parents in the dark!",
    image: "./slider 5.png"
  },
];

const carousel = document.querySelector(".carousel");
let sliders = [];

let slideIndex = 0; // to track current slide index.

const createSlide = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

// creating DOM element
let slide = document.createElement("div");
var imgElement = document.createElement("img");
let content = document.createElement("div");
let h1 = document.createElement("h1");
let p = document.createElement("p");

// attaching all elements
imgElement.appendChild(document.createTextNode(""));
h1.appendChild(document.createTextNode(movies[slideIndex].name));
p.appendChild(document.createTextNode(movies[slideIndex].des));
content.appendChild(h1);
content.appendChild(p);
slide.appendChild(content);
slide.appendChild(imgElement);
carousel.appendChild(slide);

// setting up image
imgElement.src = movies[slideIndex].image;
slideIndex++;

// setting elements classname
slide.className = "slider";
content.className = "slide-content";
h1.className = "movie-title";
p.className = "movie-des";

sliders.push(slide);

if (sliders.length) {
  sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
    30 * (sliders.length - 2)
  }px)`;
}
};

for (let i = 0; i < 3; i++) {
createSlide();
}

setInterval(() => {
createSlide();
}, 3000);


// ==============================
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();