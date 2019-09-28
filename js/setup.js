 'use strict';
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARDS_AMOUNT = 4;

 var getRandomItem = function (arr) {
   return arr[Math.round(Math.random() * (arr.length - 1))];
 };


//функция для создание масива из 4 похожих волшебников
 var createWizard = function(amount) {
   var wizardCharacters = [];
   for (var i = 0; i < amount; i++){
     wizardCharacters.push({
       name: getRandomItem(WIZARD_NAMES),
       surname: getRandomItem(WIZARD_SURNAMES),
       coatColor: getRandomItem(WIZARD_COAT_COLORS),
       eyesColor: getRandomItem(WIZARD_EYES_COLORS)
     });
   }
   return wizardCharacters;
 };

 //показали окно с похожими персонажами
 var userDialog = document.querySelector('.setup');
 userDialog.classList.remove('hidden');
//создаем масив из 4 волшебников
 var wizards = createWizard(WIZARDS_AMOUNT);

 var similarListElement = document.querySelector('.setup-similar-list');
 //находим шаблон
 var similarWizardTemplate = document.querySelector('#similar-wizard-template')
   .content
   .querySelector('.setup-similar-item');

 var fragment = document.createDocumentFragment();
//отрисовуем шаблон в документ
 for (var i = 0; i < wizards.length; i++){
   var wizardElement = similarWizardTemplate.cloneNode(true);
   wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].surname;
   wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
   wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
   fragment.appendChild(wizardElement);
 }

 similarListElement.appendChild(fragment);
 document.querySelector('.setup-similar').classList.remove('hidden');
