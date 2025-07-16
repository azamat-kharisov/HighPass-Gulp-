import { serach } from "./search";
import { burger } from "./burger";
import { initAnimations } from "./gsap";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
});

ymaps.ready(init);

let center = [55.765949, 37.62943];

function init() {
  let map = new ymaps.Map("map", {
    center: center,
    zoom: 14,
  });

  let placemark = new ymaps.Placemark(
    [55.769383, 37.638521],
    { hintContent: "Шоурум №4, Леонтьевский переулок, дом 5, строение 1" },
    {
      iconLayout: "default#image",
      iconImageHref: "./img/svg/sprite.svg#Ellipse",
      iconImageSize: [100, 100],
      iconImageOffset: [-70, -70],
    }
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

  map.geoObjects.add(placemark);
}

serach();

const target = document.querySelector(".about__form");

target.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.querySelector(".contact__form").addEventListener("submit", (e) => {
  e.preventDefault();
});

burger();
