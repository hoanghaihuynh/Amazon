import isSunSat from '../scripts/utils/date.js';    
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [
{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, 
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach(value => {
        if (value.id === deliveryOptionId) {
            deliveryOption = value;
        }
    });
    return deliveryOption || deliveryOption[0];
}
export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let deliveryDate = today;
    

    let remainingDays = deliveryOption.deliveryDays;
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (!isSunSat(deliveryDate)) {
            remainingDays--;
        }
    }

    const dateString = deliveryDate.format('dddd, MMMM DD');
    return dateString;
}