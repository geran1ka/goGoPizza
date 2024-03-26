import { URL_API } from "./const.js";
import {
  changeFirstUpperCase,
  createLabel,
  createRadioInput,
} from "./helpers.js";

export const renderModalPizza = ({
  id,
  img: images,
  name,
  price,
  toppings,
}) => {
  const modalPizzaMain = document.querySelector(".modal-pizza__main");
  modalPizzaMain.textContent = "";

  let size = Object.keys(price)[0];

  const picture = document.createElement("picture");
  const sourse = document.createElement("source");
  sourse.srcset = `${URL_API}/${images[1]}`;
  sourse.type = "image/webp";

  const img = document.createElement("img");
  img.classList.add("modal-pizza__img");
  img.src = `${URL_API}/${images[0]}`;
  img.alt = changeFirstUpperCase(name.ru);

  picture.append(sourse, img);

  const title = document.createElement("h2");
  title.classList.add("modal-pizza__title");
  title.textContent = changeFirstUpperCase(name.ru);

  const toppingsElement = document.createElement("p");
  toppingsElement.classList.add("modal-pizza__toppings");
  toppingsElement.textContent = changeFirstUpperCase(toppings.ru);

  const priseSizeInfo = document.createElement("p");
  priseSizeInfo.classList.add("modal-pizza__info");

  const priceElement = document.createElement("span");
  priceElement.classList.add("modal-pizza__price");

  const slashElement = document.createElement("span");
  slashElement.textContent = "/";

  const sizeElement = document.createElement("span");
  sizeElement.classList.add("modal-pizza__size");

  priseSizeInfo.append(priceElement, slashElement, sizeElement);

  const updatePrice = () => {
    const selectedSizeInput = form.querySelector('input[name="size"]:checked');
    size = selectedSizeInput.value;
    priceElement.textContent = `${price[size]} ₽`;
    sizeElement.textContent = `${parseInt(size)} см`;
  };

  const form = document.createElement("form");
  form.classList.add("modal-pizza__form");
  form.id = id;

  const groupFielddset = document.createElement("div");
  groupFielddset.classList.add("modal-pizza__group-fieldset");

  const fieldsetCrust = document.createElement("fieldset");
  fieldsetCrust.classList.add("modal-pizza__fieldset");
  const thickInput = createRadioInput(
    "modal-pizza__radio",
    "thick",
    "crust",
    "thick"
  );
  thickInput.checked = true;
  const thickLabel = createLabel("modal-pizza__label", "thick", "Пышное тесто");

  const thinInput = createRadioInput(
    "modal-pizza__radio",
    "thin",
    "crust",
    "thin"
  );
  const thinLabel = createLabel("modal-pizza__label", "thin", " Тонкое тесто");

  fieldsetCrust.append(thickInput, thickLabel, thinInput, thinLabel);

  const fieldsetSize = document.createElement("fieldset");
  fieldsetSize.classList.add("modal-pizza__fieldset");

  const sizeInputs = Object.keys(price).map((size) =>
    createRadioInput("modal-pizza__radio", size, "size", size)
  );
  sizeInputs[0].checked = true;

  sizeInputs.forEach((input) => {
    const label = createLabel(
      "modal-pizza__label",
      input.id,
      `${parseInt(input.value)} см`
    );
    input.addEventListener("change", updatePrice);
    fieldsetSize.append(input, label);
  });

  groupFielddset.append(fieldsetCrust, fieldsetSize);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("modal-pizza__add-cart");
  addToCartBtn.textContent = "В корзину";

  form.append(groupFielddset, addToCartBtn);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("modal__close");
  closeBtn.innerHTML = `
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="14.8333"
        y="4"
        width="0.851136"
        height="15.3204"
        transform="rotate(45 14.8333 4)"
        fill="#C1AB91"
      />
      <rect
        x="4"
        y="4.60184"
        width="0.851136"
        height="15.3204"
        transform="rotate(-45 4 4.60184)"
        fill="#C1AB91"
      />
    </svg>
  `;

  modalPizzaMain.append(
    picture,
    title,
    toppingsElement,
    priseSizeInfo,
    form,
    closeBtn
  );

  updatePrice();
};
