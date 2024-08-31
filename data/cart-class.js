class Cart {
    cartItems;
    #localStorageKey;
    
    //Mỗi lần tạo object thì sẽ chạy hàm này trước.
    //Những hàm khác thì phải gọi mới thực hiện
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        
        if (!this.cartItems) {
            this.cartItems = [ 
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
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        if (matchingItem != undefined) {
          matchingItem.quantity += 1;
        }
        else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          });
        }
      
        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });
        this.cartItems = newCart;
      
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingProduct;
        this.cartItems.forEach(value => {
          if (productId === value.productId) {
            matchingProduct = value;
          }
        });
      
        matchingProduct.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach(item => {
          if (item.productId === productId) {
            item.quantity = newQuantity;
          }
        });
      
        this.saveToStorage();
    }
}

//cart, businessCart là instance của 1 class(Cart)
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
//Kiểm tra cart, businessCart có phải instance không
console.log(cart instanceof Cart);
