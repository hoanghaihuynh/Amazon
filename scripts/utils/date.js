import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export default function isWeekend(date) {
    let flag = false;

    if (date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday') {
        flag = true;
    }

    return flag;
}