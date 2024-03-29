export const cartControl = {
  cartData: JSON.parse(localStorage.getItem("cartGoGoPizza") || "[]"),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem("cartGoGoPizza", JSON.stringify(this.cartData));
  },

  removeCart(cartId) {
    this.cartData = this.cartData.filter((item) => item.cartId !== cartId);
    console.log("this.cartData: ", this.cartData);
    localStorage.setItem("cartGoGoPizza", JSON.stringify(this.cartData));
  },

  clearCart() {
    this.cartData = [];
    localStorage.setItem("cartGoGoPizza", JSON.stringify(this.cartData));
  },
};
