import {informationForm, priceForm,typeForm, MIN_PRICE_OF_TYPE} from './form.js';

const roomNumber = informationForm.querySelector('#room_number');
const capacityForm = informationForm.querySelector('#capacity');
const timeinForm = informationForm.querySelector('#timein');
const timeOutForm = informationForm.querySelector('#timeout');

// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
timeinForm.addEventListener('change',() => {timeOutForm.value = timeinForm.value;});

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
timeOutForm.addEventListener('change',() => {timeinForm.value = timeOutForm.value;});

const pristine = new Pristine(informationForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => priceForm.value >= MIN_PRICE_OF_TYPE[typeForm.value];
const validatePriceAndType = () => priceForm.value <= MIN_PRICE_OF_TYPE[typeForm.value];
const showPriceValidationError = () => `Минимальная цена должна быть больше ${MIN_PRICE_OF_TYPE[typeForm.value]}`;
pristine.addValidator(priceForm, validatePrice, showPriceValidationError);
pristine.addValidator(typeForm, validatePriceAndType, showPriceValidationError);

const checkGuestsCount = () =>{
  if (roomNumber.value === '100' || capacityForm.value === '0'){
    return roomNumber.value === '100' && capacityForm.value === '0' ;
  }
  return Number(capacityForm.value) <= Number(roomNumber.value);
};

const validateGuests = () => Number(capacityForm.value) <= Number(roomNumber.value);
const showGuestsValidationError = () => 'Количество мест должно быть меньше или равно количеству комнат';
const showRoomsValidationError = () => 'Количество комнат должно быть больше или равно количеству мест. Если 100 комнат, то "не для гостей"';
pristine.addValidator(capacityForm, validateGuests, showGuestsValidationError);
pristine.addValidator(roomNumber, checkGuestsCount, showRoomsValidationError);

informationForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    informationForm.submit();
  }
});
