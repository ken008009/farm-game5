import CryptoJS from 'crypto-js';

export async function calculateFileSHA1(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 读取文件内容
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const wordArray = arrayBufferToWordArray(arrayBuffer);

      // 计算 SHA-1 值
      const hash = CryptoJS.SHA1(wordArray);

      // 返回 SHA-1 哈希值
      resolve(hash.toString(CryptoJS.enc.Hex));
    };

    reader.onerror = () => {
      reject(new Error('File reading failed'));
    };

    // 读取文件为 ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}

function arrayBufferToWordArray(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const words = [];

  for (let i = 0; i < uint8Array.length; i++) {
    words[i >>> 2] |= uint8Array[i] << (24 - (i % 4) * 8);
  }

  return CryptoJS.lib.WordArray.create(words, uint8Array.length);
}

export function formatTime4(ms) {
  // 计算秒数
  let seconds = Math.floor(ms / 1000);
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // 补零操作，确保是两位数
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
export function formatTime3(end) {
  const now = new Date().getTime();
  const ms = (end - now / 1000) || 0
  // console.log(end - now / 1000)
  if (ms <= 0) {
    return ''
  }
  // 计算秒数
  let seconds = Math.floor(ms);
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // 补零操作，确保是两位数
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}
export function formatTime2(ms) {
  // 计算秒数
  let seconds = ms;
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // 补零操作，确保是两位数
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  // console.log(`${hours}:${minutes}:${seconds}`)
  return `${hours}:${minutes}:${seconds}`;
}
export function formatBytes(bytes) {
  const kB = 1024;
  const MB = kB * 1024;
  const GB = MB * 1024;

  if (bytes >= GB) {
    return (bytes / GB).toFixed(2) + ' GB';
  } else if (bytes >= MB) {
    return (bytes / MB).toFixed(2) + ' MB';
  } else if (bytes >= kB) {
    return (bytes / kB).toFixed(2) + ' kB';
  } else {
    return bytes + ' bytes';  // 小于1kB时显示字节数
  }
}

export function formatTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  // 格式化时分秒
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  return { hours, minutes, seconds };
}
export function outTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const now = new Date();
  const isPast = date < now;
  return isPast
}
export function getCountdown(targetTime) {

  const now = new Date().getTime();
  const target = new Date(targetTime).getTime();
  const diff = target - now;

  if (diff <= 0) return '00:00:00';

  const hours = String(Math.floor((diff / (1000 * 60 * 60)))).padStart(2, '0');
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

  // return `${hours}:${minutes}:${seconds}`;
  return { h: hours, m: minutes, s: seconds }
}

export function getHour(seconds) {

  seconds = parseInt(seconds)

  if (!seconds) {
    return 0
  }
  const hours = parseInt(Math.floor((seconds / (60 * 60))));
  return `${hours}`;
}

export function maskString(s) {
  const str = String(s); // 确保处理字符串类型
  if (str.length > 10) { // 仅当长度 > 10 时处理
    return str.slice(0, 6) + '***' + str.slice(-4);
  }
  return str; // 长度不足时直接返回原字符串
}
export function maskString2(s) {
  const str = String(s); // 确保处理字符串类型
  if (str.length > 10) { // 仅当长度 > 10 时处理
    return str.slice(0, 3) + '***' + str.slice(-3);
  }
  return str; // 长度不足时直接返回原字符串
}
export function maskString3(s) {
  const str = String(s); // 确保处理字符串类型
  if (str.length > 10) { // 仅当长度 > 10 时处理
    return str.slice(-6);
  }
  return str; // 长度不足时直接返回原字符串
}
export function toFixed2(num) {
  if (typeof num !== 'number') num = parseFloat(num);
  if (isNaN(num)) return num;

  const str = num.toString();
  const parts = str.split('.');

  // 判断是否有小数部分，且超过两位
  if (parts.length === 2 && parts[1].length > 2) {
    return parseFloat(num.toFixed(2));
  }
  return num;
}
export function toFixed4(num) {
  if (typeof num !== 'number') num = parseFloat(num);
  if (isNaN(num)) return num;

  const str = num.toString();
  const parts = str.split('.');

  // 判断是否有小数部分，且超过四位
  if (parts.length === 2 && parts[1].length > 4) {
    return parseFloat(num.toFixed(4));
  }
  return num;
}
