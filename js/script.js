"use strict";

var link = document.querySelector(".feedback-btn");
var popup = document.querySelector(".feedback-form");
var overlay = document.querySelector(".overlay");
var close = popup.querySelector(".feedback-btn-close");
var feedbackUsername = popup.querySelector("[name=username]");
var feedbackEmail = popup.querySelector("[name=email]");
var feedbackComment = popup.querySelector("[name=comment]");
var form = popup.querySelector("form");
var storageUsername = localStorage ? localStorage.getItem("feedbackUsername") : false;
var storageEmail = localStorage ? localStorage.getItem("feedbackEmail") : false;
var myMap;
var myPlacemark;

function init() {
    myMap = new ymaps.Map("map", {
        center: [59.939449, 30.327968],
        zoom: 16
    }, {
        searchControlProvider: "yandex#search"
    });
    
    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
        balloonContent: "Магазин Gllacy"
    },
        {
            iconLayout: "default#image",
            iconImageHref: "img/map-marker.png",
            iconImageSize: [218, 142],
            iconImageOffset: [-45, -142]
        });
    myMap.geoObjects.add(myPlacemark);
}

link.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("feedback-form-show");
    overlay.classList.add("overlay-show");
    feedbackUsername.focus();
    
    if (storageUsername && storageEmail) {
        feedbackUsername.value = storageUsername;
        feedbackEmail.value = storageEmail;
        feedbackComment.focus();
    }
});

close.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.remove("feedback-form-show");
    overlay.classList.remove("overlay-show");
});

form.addEventListener("submit", function (event) {
    if (!feedbackUsername.value || !feedbackEmail.value) {
        event.preventDefault();
    } else {
        localStorage.setItem("feedbackUsername", feedbackUsername.value);
        localStorage.setItem("feedbackEmail", feedbackEmail.value);
    }
});

window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (popup.classList.contains("feedback-form-show")) {
            popup.classList.remove("feedback-form-show");
            overlay.classList.remove("overlay-show");
        }
    }
});

overlay.addEventListener("click", function (event) {
    popup.classList.remove("feedback-form-show");
    overlay.classList.remove("overlay-show");
});

ymaps.ready(init);