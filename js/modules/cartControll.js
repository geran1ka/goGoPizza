export const cartControl = {
  cartData: JSON.parse(localStorage.getItem("cartGoGoPizza") || "[]"),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem("cartGoGoPizza", JSON.stringify(this.cartData));
  },

  removeCart() {
    // !todo написать функцию
  },
};
