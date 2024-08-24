export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

export function applyTax(price) {
    let afterTax = price * 0.1;
    return afterTax;
}

export function calculateMoneyAfterTax(taxPrice, totalPrice) {
    let hehe = taxPrice + totalPrice;
    return hehe;
}