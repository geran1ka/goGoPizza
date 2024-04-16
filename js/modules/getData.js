import { hideLoader, showLoader } from "./loader.js";

export const getData = async (url) => {
  // showLoader();
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Не удалось получить данные`);
    }

    return await response.json();
  } catch (error) {
    console.log("error: ", error);

    return [];
  } finally {
    // hideLoader();
  }
};
