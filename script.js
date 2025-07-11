const allButtons = document.getElementById("all-buttons");
const cards = document.querySelectorAll(".card-content");

const getData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

getData();