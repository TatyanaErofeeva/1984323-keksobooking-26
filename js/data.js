/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {getRandomArrayElement,randomIntegerNumber,randomNotIntegerNumber} from './utils.js';

const SIMILAR_OBJECTS_COUNT = 10;

const TYPE_NAMES =[
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_VARIANTS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT_VARIANTS = [
  '12:00',
  '13:00',
  '14:00'
];

const PHOTOS_TYPES =[
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const FEATURES_TYPES =[
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const arrayOfNumbers = [1,2,3,4,5,6,7,8,9,10];

//Функция возвращающая значение элемента массива с ведущим 0
function getNonRepeatableNumberOfPicture (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = randomIntegerNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // eslint-disable-next-line prefer-template
      // eslint-disable-next-line no-console
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = randomIntegerNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue.toString().padStart(2,0);
  };
}
const generatePhotoId = getNonRepeatableNumberOfPicture (1, 20);

// Определение полей для объекта offer
function getNewArrayOfFeatures() {
  const maxLength = FEATURES_TYPES.length;
  const newArray = [];
  const newArrayLength = randomIntegerNumber(1, maxLength);
  while (newArray.length < newArrayLength) {
    const indexOfEl = randomIntegerNumber(0, maxLength - 1);
    const el = FEATURES_TYPES[indexOfEl];
    if (!newArray.includes(el)) {
      newArray.push(el);
    }
  }
  return newArray;
}

// photos, массив строк — массив случайной длины из значений:
const getNewArrayOfPhotos = () => {
  const newArray = [];
  const newArrayLength = randomIntegerNumber(1, PHOTOS_TYPES.length);
  for (let i=0; i < newArrayLength; i++ ){
    newArray.push(PHOTOS_TYPES[i]);
  }
  return newArray;
};

//Функция по созданию типового объекта
const createAnObject = () => {
  const author = {
    avatar: `img/avatars/user${generatePhotoId()}.png`
  };

  const location ={
    lat: randomNotIntegerNumber(35.65000, 35.70000, 5),
    lng: randomNotIntegerNumber(139.70000, 139.80000, 5)
  };

  const offer = {
    title: 'Предлагаем для рассмотрения',
    address: `${location.lat}, ${location.lng}`,
    price: randomIntegerNumber(0,100000),
    type: getRandomArrayElement(TYPE_NAMES),
    rooms: randomIntegerNumber(1,100),
    guests: randomIntegerNumber(1,5),
    checkin: getRandomArrayElement(CHECKIN_VARIANTS),
    checkout: getRandomArrayElement(CHECKOUT_VARIANTS),
    features: getNewArrayOfFeatures(),
    description:'Супер-мега-пуперистое помещение :)',
    photos:getNewArrayOfPhotos(),
  };

  return {
    author,
    offer,
    location
  };
};

const createObjects = () => Array.from({length: SIMILAR_OBJECTS_COUNT}, createAnObject);

export {createObjects};
