/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */

//isMobile

var ua = window.navigator.userAgent
  , msie = ua.indexOf("MSIE ")
  , isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
    }
};
function isIE() {
    return (ua = navigator.userAgent).indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1
}
isIE() && document.querySelector("body").classList.add("ie"),
isMobile.any() && document.querySelector("body").classList.add("_touch");
//isMobile

if(isMobile.any()){
//если мы на мобилке - чето будем делать с маусентером (клик вешаем и слушаем)
    let menuParents = document.querySelectorAll('.menu-page__parent>a'); //обращаемся не ко всем ссылкам, а только к тем кто вложен в парент, поэтому с >
    for (let index = 0; index < menuParents.length; index++) {
        const menuParent = menuParents[index];
        menuParent.addEventListener('click', function(e){
            menuParent.parentElement.classList.toggle('_active');
            e.preventDefault();
        });
    }
}else{ //если нет - всё стандартно
    let menuParents = document.querySelectorAll('.menu-page__parent');
    let submenuItems = document.querySelectorAll('.submenu-page__item');

    for (let index = 0; index < menuParents.length; index++){
        const menuParent = menuParents[index];
        menuParent.addEventListener("mouseenter", function(e){
            menuParent.classList.add('_active');
        });
        menuParent.addEventListener("mouseleave", function(e){
            menuParent.classList.remove('_active');
        });
    }
}


document.querySelector(".icon-menu").addEventListener("click", () => {
document.querySelector(".icon-menu").classList.toggle("_active"), document.querySelector(".menu__body").classList.toggle("_active")
});



let menuPageBurger = document.querySelector('.menu-page__burger');
let menuPageBody = document.querySelector('.menu-page__body');


menuPageBurger.addEventListener('click', function(e){
    menuPageBurger.classList.toggle('_active');
    menuPageBody.classList.toggle('_active');
    //ваще можно было к одному классу прописать одинаковые стили по идее, но мы экономим время поэтому делаем вот так вот
});

let searchSelect= document.querySelector('.search-page__select');
let categoriesSearch = document.querySelector('.categories-search');
searchSelect.addEventListener('click', function(e){
    searchSelect.classList.toggle('_active');
    categoriesSearch.classList.toggle('_active');
});

let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');

for (let index = 0; index < checkboxCategories.length; index++) {
    const checkboxCategory = checkboxCategories[index];
    checkboxCategory.addEventListener('change', function(e){
        checkboxCategory.classList.toggle('_active');

        let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox._active');

        if (checkboxActiveCategories.length > 0){
            searchSelect.classList.add('_categories');
            let searchQuanity = document.querySelector('.search-page__quanity');
            searchQuanity.innerHTML = searchQuanity.getAttribute('data-text') + checkboxActiveCategories.length;
        } else {
            searchSelect.classList.remove('_categories');
        }
    });
}


// swiper slider start
let sliders = document.querySelectorAll("._swiper");
if (sliders) {
    for (let e = 0; e < sliders.length; e++) {
        let t = sliders[e];
        if (!t.classList.contains("swiper-bild")) {
            let e = t.children;
            if (e)
                for (let t = 0; t < e.length; t++) {
                    e[t].classList.add("swiper-slide")
                }
            let o = t.innerHTML,
                l = document.createElement("div");
            if (l.classList.add("swiper-wrapper"), l.innerHTML = o, t.innerHTML = "", t.appendChild(l), t.classList.add("swiper-bild"), t.classList.contains("_swiper_scroll")) {
                let e = document.createElement("div");
                e.classList.add("swiper-scrollbar"), t.appendChild(e)
            }
        }
        t.classList.contains("_gallery")
    }
    sliders_bild_callback()
}

function sliders_bild_callback(e) {}
let sliderScrollItems = document.querySelectorAll("._swiper_scroll");
if (sliderScrollItems.length > 0)
    for (let e = 0; e < sliderScrollItems.length; e++) {
        const t = sliderScrollItems[e],
            o = t.querySelector(".swiper-scrollbar");
        new Swiper(t, {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: !0,
            scrollbar: {
                el: o,
                draggable: !0,
                snapOnRelease: !1
            },
            mousewheel: {
                releaseOnEdges: !0
            }
        }).scrollbar.updateSize()
    }

function sliders_bild_callback(e) {}
if (document.querySelector(".mainslider")) {
    let slider__about = new Swiper(".mainslider__body", {
        autoplay: {
            delay: 1e4,
            disableOnInteraction: !1
        },
        observer: !0,
        observeParents: !0,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        preloadImages: !1,
        lazy: {
            loadPrevNext: !0
        },
        pagination: {
            el: ".mainslider__dotts",
            clickable: !0
        }
    });
    let mainSliderImages = document.querySelectorAll('.mainslider__image');
    let mainSliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

    for (let index = 0; index < mainSliderImages.length; index++) {
        const mainSliderImage = mainSliderImages[index].querySelector('img').getAttribute('src');
        mainSliderDotts[index].style.backgroundImage = "url('" + mainSliderImage + "')";

    }
}
// swiper slider end


let HUETA_EBUCHAYA = document.querySelector('.mainslider__dotts');
HUETA_EBUCHAYA.classList.remove('swiper-pagination-horizontal');

//.swiper-pagination-bullets .swiper-pagination-horizontal



//# sourceMappingURL=main.js.map
