const allButtons = document.getElementById("all-buttons");
const cardContainer = document.querySelector(".card-container");
const svgImages = ["work", "play", "study", "exercise", "social", "self-care"];

const getData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    console.error(err);
  }
}

function updateUI(data) {
  
  data.forEach((item, index) => {
    
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
              <p class="text-3-light">${item.timeframes.daily.current}hrs</p>
              <p class="text-6-regular">
                <span>Yesterday</span> - <span>${item.timeframes.daily.previous}hrs</span>
              </p>
            </div>
          </div>
        </div>
    `;
  })
}

getData();
