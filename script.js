const allButtons = document.querySelectorAll(".btn");
const cardContainer = document.querySelector(".card-container");
const svgImages = ["work", "play", "study", "exercise", "social", "self-care"];
let allData = [];

const getData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    allData = data;
    updateUI("daily");
  } catch (err) {
    console.error(err);
  }
}

function updateUI(timeframe) {
  cardContainer.innerHTML = "";

  let history;
  if (timeframe === "daily") {
    history = "Yesterday";
  }
  if (timeframe === "weekly") {
    history = "Last Week";
  }
  if (timeframe === "monthly") {
    history = "Last Month";
  }
 
  allData.forEach((item, index) => {
    const tf = item.timeframes[timeframe]
    
    cardContainer.innerHTML += `
      <div class="card card-${index + 1}">
          <div class="card-img">
            <img src="./images/icon-${svgImages[index]}.svg" alt="" />
          </div>
          <div class="card-content">
            <div class="card-header">
              <h2 class="text-5-medium">${item.title}</h2>
              <button class="card-btn" type="button">
                <img src="./images/icon-ellipsis.svg" alt="" />
              </button>
            </div>
            <div class="card-text">
              <p class="text-3-light">${tf.current}hrs</p>
              <p class="text-6-regular">
                <span>${history}</span> - <span>${tf.previous}hrs</span>
              </p>
            </div>
          </div>
        </div>
    `;
  })
}

allButtons.forEach(button => {
  button.addEventListener("click", () => {
    allButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    updateUI(button.id);
  })
})

// Fill cards with data
getData();

