import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency, applyTax, calculateMoneyAfterTax} from '../utils/money.js';

export function renderPaymentSummary() {
    let summaryPriceProduct = 0;
    let summaryShippingPrice = 0;
    cart.forEach(cartItem => {
        const matchingProduct = getProduct( cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId); 

        summaryPriceProduct += matchingProduct.priceCents * cartItem.quantity;
        summaryShippingPrice += deliveryOption.priceCents;
    }); 

    const priceBeforeTax = summaryPriceProduct + summaryShippingPrice;
    const priceAfterTax = applyTax(priceBeforeTax);
    const orderTotal = priceBeforeTax + priceAfterTax;

    const html = `
        <div class="payment-summary js-payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(summaryPriceProduct)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(summaryShippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(priceAfterTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;
    document.querySelector('.js-payment-summary').innerHTML = html;
}


