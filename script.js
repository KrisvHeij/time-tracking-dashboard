const cardContainer = document.querySelector(".card-container");
const buttons = document.querySelectorAll(".btn");
const imageNames = ["work", "play", "study", "exercise", "social", "self-care"];
let allData = [];

// Get data from data.json file
const getData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    allData = data;
    // Fill page with data  with placeholder ""daily
    updateUI("daily");
  } catch (err) {
    console.error(err);
  }
}

function updateUI(timeframe) {
  // Clear cardContainer
  cardContainer.innerHTML = "";

  // Fill cardContainer with data
  allData.forEach((item, index) => {
    const tf = item.timeframes[timeframe];
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

    cardContainer.innerHTML += 
    `
      <div class="card card-${index + 1}">
        <div class="card-img">
            <img src="./images/icon-${imageNames[index]}.svg" alt="" />
        </div>
        <div class="card-content">
          <div class="card-header">
            <h2 class="text-5-medium">${item.title}</h2>
            <button class="card-btn" type="button">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
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

// Filter UI
buttons.forEach((btn) => {
  
  btn.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));

    btn.classList.add("active");
    // UpdateUI with filter option
    updateUI(btn.id);
  })
})

// Get data on load
getData();