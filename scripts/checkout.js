import { renderOrderSummary } from '../scripts/checkout/orderSummary.js';
import {renderPaymentSummary} from '../scripts/checkout/paymentSummary.js';
import {updateCartItemQuantity} from '../data/cart.js';

updateCartItemQuantity();
renderOrderSummary();
renderPaymentSummary();
