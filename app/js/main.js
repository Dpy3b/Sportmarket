/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
document.querySelector(".icon-menu").addEventListener("click", () => {
document.querySelector(".icon-menu").classList.toggle("_active"), document.querySelector(".menu__body").classList.toggle("_active")
});

/*
const textArea = document.querySelectorAll("[data-autoresize]");
textArea.forEach(e => {
    e.addEventListener("input", e => {
        let t = e.target;
        t.style.height = "30px", t.style.height = t.scrollHeight + "px"
    })
}), document.querySelector(".burger").addEventListener("click", () => {
    document.querySelector(".burger").classList.toggle("burger--active"), document.querySelector(".sidebar").classList.toggle("sidebar--active")
}), document.querySelector(".sidebar__btn--violet").addEventListener("click", () => {
    document.getElementById("contact-modal").classList.add("modal--active")
}), document.querySelector(".modal__close").addEventListener("click", () => {
    document.getElementById("contact-modal").classList.remove("modal--active")
});
const shareLink = document.querySelectorAll(".share-link");
shareLink.forEach((function (e) {
    e.addEventListener("click", (function () {
        document.getElementById("share-modal").classList.add("modal--active")
    }))
}));
const modal__close = document.querySelectorAll(".modal__close");
modal__close.forEach((function (e) {
    e.addEventListener("click", (function () {
        document.getElementById("share-modal").classList.remove("modal--active")
    }))
}));
const storiesItem = document.querySelectorAll(".stories__item");
storiesItem.forEach((function (e) {
    e.addEventListener("click", (function () {
        document.getElementById("stories-modal").classList.add("modal--active")
    }))
})), $(document).ready((function () {
    $("#stories-modal").on("click", (function () {
        $("#stories-modal").removeClass("modal--active"), $(this).addClass("#stories-modal")
    }))
}));
*/
//# sourceMappingURL=main.js.map
