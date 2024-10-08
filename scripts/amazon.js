import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

//Body HTML
let productsHTML = '';
products.forEach((product) => {
    productsHTML += `
     <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart data-product-id-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-name="${product.name}" data-product-id="${product.id}">
          Add to Cart
        </button>
     </div>
    `;
});

//Container của bodyHTML
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//Không cho function này vào cart.js là vì số lượng sp trong giỏ hàng 
//Còn update trong cart nghĩa là thay đổi số lượng hàng trong cart
// Đơn giản 1 cái là updateCartQuantity còn 1 cái là updateProductQuantity
function updateCartQuantity() {
  //Số lượng item trong giỏ hàng
  let cartLength = cart.length;
  // cart.forEach((item) => {
  //   cartQuantity += item.quantity;
  // });
  if (cartLength === 0) {
    cartLength = '';
  }
  document.querySelector('.js-cart-quantity').innerHTML = cartLength;
}

//Khi click vào button 'Add to cart'
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});
updateCartQuantity();