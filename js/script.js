const toppingsToogle = () => {
  const toppingsButton = document.querySelector(".toppings__button");
  const toppingsList = document.querySelector(".toppings__list");

  toppingsButton.addEventListener("click", () => {
    if (!toppingsList.classList.contains("toppings__list_show")) {
      toppingsList.classList.add("toppings__list_show");
      toppingsButton.classList.add("toppings__button_active");

      toppingsList.style.maxHeight = toppingsList.scrollHeight + "px";
    } else {
      toppingsButton.classList.remove("toppings__button_active");
      toppingsList.style.maxHeight = null;

      setTimeout(() => {
        toppingsList.classList.remove("toppings__list_show");
      }, 300);
    }
  });
};

const getPizzas = async () => {
  try {
    const response = await fetch(
      `https://fallacious-bony-lung.glitch.me/api/products`
    );

    if (!response.ok) {
      throw new Error(`Не удалось получить список пиццы`);
    }

    return await response.json();
  } catch (error) {
    console.log("error: ", error);

    return error?.message;
  }
};

const createCard = (data) => {
  console.log("data: ", data);
  const card = document.createElement("article");
  card.classList.add("pizza__card", "card");
  card.innerHTML = `
  <picture>
    <sourse srcset="${data.images[1]}" type="image/webp">
    <img
      class="card__image"
      src="${data.images[0]}"
      alt="${data.name.ru}"
    />
  </picture>
  <div class="card__content">
    <h3 class="card__title">${data.name["ru"][0].toUpperCase()}${data.name["ru"]
    .slice(1)
    .toLowerCase()}</h3>

    <p class="card__info">
      <span class="card__price">${data.price["25cm"]}</span>
      <span>/</span>
      <span class="card__weight">25см</span>
    </p>

    <button class="card__button" data-id="${data.id}">Выбрать</button>
  </div>
  `;

  return card;
};

const renderPizzas = async () => {
  const pizzas = await getPizzas();

  const pizzaList = document.querySelector(".pizza__list");
  pizzaList.textContent = "";

  const items = pizzas.map((data) => {
    const item = document.createElement("li");
    item.classList.add("pizza__item");
    const card = createCard(data);
    item.append(card);
    return item;
  });

  pizzaList.append(...items);
};

const init = () => {
  toppingsToogle();

  renderPizzas();
};

init();

// <li class="pizza__item">
// <article class="pizza__card card">
//   <img
//     class="card__image"
//     src="img/pizza-margherita.png"
//     alt="Маргарита"
//   />

//   <div class="card__content">
//     <h3 class="card__title">Маргарита</h3>

//     <p class="card__info">
//       <span class="card__price">480</span>
//       <span>/</span>
//       <span class="card__weight">25см</span>
//     </p>

//     <button class="card__button">Выбрать</button>
//   </div>
// </article>