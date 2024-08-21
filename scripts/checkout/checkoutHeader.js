import {cart} from '../../data/cart.js';

//Update số lượng item trong card
export function renderCheckoutHeader() {
  let html = '';
  html += `
    <a class="return-to-home-link js-return-to-home-link" href="amazon.html">
      ${cart.length} items
    </a>
  `

  document.querySelector('.js-return-to-home-link').innerHTML = html;
}