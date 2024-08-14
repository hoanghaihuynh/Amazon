import {cart} from '../data/cart.js';

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
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
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


document.querySelector('.js-products-grid').innerHTML = productsHTML;
let timeoutId;
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    // button.dataset sẽ trả về 1 object có dữ liệu của product
    const productName = button.dataset.productName;
    const productId = button.dataset.productId;
    /*
      shortcut : const { productId } = button.dataset;
    */

    let matchingItem;
    //Quantity Selector
    let quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem != undefined) {
      matchingItem.quantity += quantitySelector;
    }
    else {
      cart.push({
        productId: productId,
        quantity: quantitySelector
      });
    }

    //Added 2 giây (1)
    let added = document.querySelector(`.data-product-id-${productId}`).classList.add('added');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      document.querySelector(`.data-product-id-${productId}`).classList.remove('added');
    } ,2000);

    //Số lượng item trong giỏ hàng
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    
    console.log(cart);
  });
});

// (1)
/*
  console.log(1)
  console.log(2)
  console.log(3)... -> sẽ ra kq: 1, 2, 3... => Đây là đồng bộ (tuần tự)

  setTimeout(() => {
      console.log(4);
  },2000)
  console.log(5);
  -> sẽ ra kq: 1, 2, 3, 5, 4 => Đây là bất đồng bộ => số 4 sẽ đc vào 1 hàng chờ ưu tiên thấp

  ** Mặc dù chạy kh theo thứ tự nhưng cta có thể kiểm soát được.
  ** Vì là ưu tiên thấp nên bđb được thực hiện sau, đb được thực hiện trc

*/