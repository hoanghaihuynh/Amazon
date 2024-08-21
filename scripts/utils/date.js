import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export default function isWeekend(date) {
    let date_of_month = dayjs(date).format('dddd');
    return date_of_month;
}