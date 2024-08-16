export const cart = [];

export function addToCart(productId) {
    let matchingItem;
    //Quantity Selector
    let quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
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
  
  }