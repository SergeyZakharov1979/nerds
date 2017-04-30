//Определяем переменные сценария 
var btnWriteUs = document.querySelector('.write-us');
var popupWriteUs = document.querySelector('.modal-write-us');
var btnWriteUsClose = document.querySelector('.close-write-us');
var formWriteUs = popupWriteUs.querySelector('.write-us-form');
var userName = formWriteUs.querySelector('[name=login]');
var userEmail = formWriteUs.querySelector('[name=email]');
var userField = formWriteUs.querySelector('textarea');
var storageLogin = localStorage.getItem('keyLogin');
var storageEmail = localStorage.getItem('keyEmail');

// Отлавливаем событие клика по кнопке "Напишите нам"
// Отменяем действия ссылки по умолчанию 
// В функции добавляем специальный класс для появления модального окна
btnWriteUs.addEventListener('click', function(event){
	event.preventDefault();
	popupWriteUs.classList.add('modal-write-us-show');
	if (storageLogin) {
		userName.value = storageLogin;
		userEmail.focus();
	}
	else {
		userName.focus();
	}
	if (storageEmail) {
			userEmail.value = storageEmail;
			userField.focus();
	}
	else {
		userEmail.focus();
	}
});
// Отлавливаем событие клика по кнопке "Закрыть"
// Отменяем действия ссылки по умолчанию 
// В функции удаляем специальный класс для удаления модального окна
btnWriteUsClose.addEventListener('click', function(event){
	event.preventDefault();
	popupWriteUs.classList.remove('modal-write-us-show');
	popupWriteUs.classList.remove('modal-error');
});
// Проверка формы на заполнение важных полей c сохранением в localStorage
// Если не заполнена - включаем анимацию "Тряска"
formWriteUs.addEventListener('click', function(event){
	if (!userName.value || !userEmail.value) {
		event.preventDefault();
		popupWriteUs.classList.remove("modal-error");
  	popupWriteUs.offsetWidth = popupWriteUs.offsetWidth;
		popupWriteUs.classList.add('modal-error');
	}
	else {
		localStorage.setItem('keyLogin', userName.value);
		localStorage.setItem('keyEmail', userEmail.value);
	}
});
// Отлавливаем нажатие кнопки Esc у всего окна Window
// Проверяем открытие окна
// Закрываем окно, если оно открыто
window.addEventListener('keydown', function(event){
	if (event.keyCode === 27) {
		if (popupWriteUs.classList.contains('modal-write-us-show')) {
			popupWriteUs.classList.remove('modal-write-us-show');
			popupWriteUs.classList.remove('modal-error');
		}	
	}
});

// initMap() - функция инициализации карты
function initMap() {
	// Координаты центра на карте. Широта: 59.9387942, Долгота: 30.3208946
	var centerLatLng = new google.maps.LatLng(59.938790, 30.322);
	// Обязательные опции с которыми будет проинициализированна карта
	var mapOptions = {
		center: centerLatLng, // Координаты центра мы берем из переменной centerLatLng
		zoom: 17 // Зум по умолчанию. Возможные значения от 0 до 21
	};
  // Создаем карту внутри элемента #map
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// Добавляем маркер
	var markerPoz = new google.maps.LatLng(59.938790, 30.3238);
	var marker = new google.maps.Marker({
		position: markerPoz, // координаты расположения маркера
		map: map, //карта на которую нужно добавить маркер
		icon: "../img/map-marker.png"
	});
}

google.maps.event.addDomListener(window, "load", initMap);
