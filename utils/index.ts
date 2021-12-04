// import CryptoJS from 'crypto-js';
// const algorithm = 'aes-256-ctr';
// const KEY = 'micke_is_louser'; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
// const IV_LENGTH = 16;

// export function encrypt(text: string): string {
//     return CryptoJS.AES.encrypt(text, KEY).toString();
// }

// export function decrypt(text: string): string {
//     return CryptoJS.AES.decrypt(text, KEY).toString(CryptoJS.enc.Utf8);
// }

// import { nanoid } from 'nanoid';

// const idMap = {};

// export function encrypt(text: string): string {
//     const id = nanoid();
//     idMap[id] = text;
//     console.log('enc', idMap);
//     return id;
// }

// export function decrypt(id: string): string {
//     console.log('dec', idMap);
//     return idMap[id];
// }

const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
export function timeSince(time: number) {
    const date = new Date(time * 1000)
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    if (!interval) return null;
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

export function kFormatter(num: number) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}