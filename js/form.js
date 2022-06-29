const informationForm = document.querySelector('.ad-form');
const informationFormElements = informationForm.querySelectorAll('.fieldset');
const filterForm = document.querySelector('.map__filters');
const priceForm = informationForm.querySelector('#price');
const typeForm = informationForm.querySelector('#type');
const slider = document.querySelector('.ad-form__slider');

const switchCondition = () => {
  informationForm.classList.toggle('ad-form--disabled');
  informationFormElements.forEach((fieldset) => {
    fieldset.disabled = !fieldset.disabled;
  });
};

const disableFilterForm = () => {
  filterForm.classList.toggle('map__filters--disabled');
  for (const filterFormItem of filterForm.children) {
    filterFormItem.disabled = !filterFormItem.disabled;
  }
};

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  behaviour: 'drag-all',
  step: 500,
  range: {
    'min': [0],
    'max': [100000]
  }
}
);

slider.noUiSlider.on('change', (values, handle) => {
  priceForm.value = Math.floor(values[handle]);
});

const MIN_PRICE_OF_TYPE= {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const getTypeChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};
typeForm.addEventListener('change',getTypeChange);


disableFilterForm();
switchCondition();
export {informationForm, priceForm, typeForm, switchCondition,MIN_PRICE_OF_TYPE};
