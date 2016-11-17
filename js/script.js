"use strict";

var link = document.querySelector(".feedback-btn");
var popup = document.querySelector(".feedback-form");
var overlay = document.querySelector(".overlay");
var close = popup.querySelector(".feedback-btn-close");
var feedbackUsername = popup.querySelector("[name=username]");
var feedbackEmail = popup.querySelector("[name=email]");
var feedbackComment = popup.querySelector("[name=comment]");
var form = popup.querySelector("form");
var storageUsername = localStorage.getItem("feedbackUsername");
var storageEmail = localStorage.getItem("feedbackEmail");


link.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.add("feedback-form-show");
    overlay.classList.add("overlay-show");
    feedbackUsername.focus();
    
    if (storageUsername) {
        feedbackUsername.value = storageUsername;
        feedbackEmail.focus();
    } else {
        feedbackUsername.focus();
    }
    
    if (storageEmail) {
        feedbackEmail.value = storageEmail;
        feedbackComment.focus();
    } else {
        feedbackEmail.focus();
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