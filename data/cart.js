export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }, 
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryOptionId: '3'
    }
  ];
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

let timeoutId;
export function addToCart(productId) {
    let matchingItem;
    //Quantity Selector
    // let quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem != undefined) {
      matchingItem.quantity += 1;
    }
    else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingProduct;
  cart.forEach(value => {
    if (productId === value.productId) {
      matchingProduct = value;
    }
  });

  matchingProduct.deliveryOptionId = deliveryOptionId;
  // console.log(productId);
  // console.log(deliveryOptionId);
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach(item => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
    }
  });

  saveToStorage();
}
