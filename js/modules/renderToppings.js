import { URL_API } from "./const.js";
import { getData } from "./getData.js";
import { changeFirstUpperCase } from "./helpers.js";
import { renderPizzas } from "./renderPizzas.js";

export const renderToppings = async () => {
  const { en: enToppings, ru: ruToppings } = await getData(
    `${URL_API}/api/toppings`
  );

  const toppingsList = document.querySelector(".toppings__list");
  toppingsList.textContent = "";

  const items = enToppings.map((data, i) => {
    const item = document.createElement("li");
    item.innerHTML = `
    <input
    id="${data}"
    class="toppings__checkbox"
    type="checkbox"
    value="${data}"
    name="topping"
  />

  <label 
    class="toppings__label"
    for="${data}">${changeFirstUpperCase(ruToppings[i])}</label>
    `;

    return item;
  });

  const itemReset = document.createElement("li");
  itemReset.classList.add("toppings__item");

  const btnReset = document.createElement("button");
  btnReset.classList.add("toppings__reset");
  btnReset.textContent = "Сбросить";
  btnReset.type = "reset";
  itemReset.append(btnReset);

  toppingsList.append(...items);

  const toppingsForm = document.querySelector(".toppings__form");
  toppingsForm.addEventListener("change", (e) => {
    const formData = new FormData(toppingsForm);

    const checkedToppings = [];

    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }

    console.log("checkedToppings: ", checkedToppings);

    renderPizzas(checkedToppings);

    btnReset.addEventListener("click", () => {
      itemReset.remove();
      toppingsForm.reset();
      renderPizzas();
    });

    if (checkedToppings.length) {
      toppingsList.append(itemReset);
    } else {
      itemReset.remove();
    }
  });

  return toppingsList;
};
