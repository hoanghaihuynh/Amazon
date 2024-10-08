import {cart, removeFromCart, updateDeliveryOption, updateQuantity} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import isSatSun from '../utils/date.js';
import {renderCheckoutHeader} from './checkoutHeader.js';
//1 file chỉ đc đặt 1 default export: VD bên money.js với function formatCurrency()
// Còn với dayjs thì vs function dayjs()

export function renderOrderSummary() {

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        //Dùng matchingProduct vì: chỉ cần lưu 1 productId là những thuộc tính còn lại sẽ được tự đông
        //tiếp nhận. 
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM DD');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                                Update
                            </span>
                            <input class="update-input js-update-input js-update-input-${matchingProduct.id}" type="number"></input>
                            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}"> 
                                Save
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let deliveryOptionsHTML = '';
        deliveryOptions.forEach(deliveryOption => {
            const dateString = calculateDeliveryDate(deliveryOption);
            
            const priceString = (deliveryOption.priceCents === 0) ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

            const isChecked = (deliveryOption.id === cartItem.deliveryOptionId);

            deliveryOptionsHTML += 
            `
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>  
            `
        });
        return deliveryOptionsHTML;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
			renderCheckoutHeader();
            renderPaymentSummary();
        })
    });

    document.querySelectorAll('.js-delivery-option').forEach(value => {
        value.addEventListener('click', () => {
            const productId = value.dataset.productId;
            const deliveryOptionId = value.dataset.deliveryOptionId;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    
    document.querySelectorAll('.js-update-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        }); 
    });

    document.querySelectorAll('.js-save-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

            let inputValue = document.querySelector(`.js-update-input-${productId}`);
            let newQuantity = inputValue.value;

             //Validation
            if (newQuantity <= 0 || newQuantity >= 1000) {
                alert('Quantity must be less than 1000 or more than 0')
                newQuantity = 1;
            }

            updateQuantity(productId, newQuantity);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });

}