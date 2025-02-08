const container = document.getElementById("card-container");

// Generate 6 cards:
for (let i = 0; i < 6; i++) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Card-Front
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  //Front Card Image
  const frontImg = document.createElement("div");
  frontImg.classList.add("img-container");
  frontImg.innerHTML =
    '<img class="card-front__img" src="./assets/images/ron.png" alt="ron outline">';
  cardFront.append(frontImg);

  // Card-Back
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  const quoteText = document.createElement("p");
  quoteText.classList.add("quote-text");

  // Append to front/back
  cardBack.appendChild(quoteText);
  card.appendChild(cardFront);
  card.appendChild(cardBack);

  card.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".card");
    handleCardClick(clickedCard);
  });

  container.appendChild(card);
}

async function handleCardClick(clickedCard) {
  try {
    const flippedCard = document.querySelector(".card.flipped");
    if (flippedCard && flippedCard !== clickedCard) {
      flippedCard.classList.remove("flipped");
    }

    //flip clicked card
    if (!clickedCard.classList.contains("flipped")) {
      await getRonSwansonQuote(clickedCard);
      clickedCard.classList.add("flipped");
    } else {
      clickedCard.classList.remove("flipped");
    }
  } catch (error) {
    console.log("Error Fetching Quote:", error);
  }
}

//get quote
async function getRonSwansonQuote(card) {
  try {
    const response = await axios.get(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );
    const data = await response.data;
    card.querySelector(".quote-text").textContent = `"${data[0]}"`;
  } catch (error) {
    console.log(error);
  }
}
