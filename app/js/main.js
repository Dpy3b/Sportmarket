function ibg() {
    if (isIE()) {
        let t = document.querySelectorAll("._ibg");
        for (var e = 0; e < t.length; e++)
            t[e].querySelector("img") && null != t[e].querySelector("img").getAttribute("src") && (t[e].style.backgroundImage = "url(" + t[e].querySelector("img").getAttribute("src") + ")")
    }
}


//SlidetToggle
let _slideUp = (e,t=500)=>{
    e.style.transitionProperty = "height, margin, padding",
    e.style.transitionDuration = t + "ms",
    e.style.height = e.offsetHeight + "px",
    e.offsetHeight,
    e.style.overflow = "hidden",
    e.style.height = 0,
    e.style.paddingTop = 0,
    e.style.paddingBottom = 0,
    e.style.marginTop = 0,
    e.style.marginBottom = 0,
    window.setTimeout(()=>{
        e.style.display = "none",
        e.style.removeProperty("height"),
        e.style.removeProperty("padding-top"),
        e.style.removeProperty("padding-bottom"),
        e.style.removeProperty("margin-top"),
        e.style.removeProperty("margin-bottom"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        e.classList.remove("_slide")
    }
    , t)
}
  , _slideDown = (e,t=500)=>{
    e.style.removeProperty("display");
    let o = window.getComputedStyle(e).display;
    "none" === o && (o = "block"),
    e.style.display = o;
    let l = e.offsetHeight;
    e.style.overflow = "hidden",
    e.style.height = 0,
    e.style.paddingTop = 0,
    e.style.paddingBottom = 0,
    e.style.marginTop = 0,
    e.style.marginBottom = 0,
    e.offsetHeight,
    e.style.transitionProperty = "height, margin, padding",
    e.style.transitionDuration = t + "ms",
    e.style.height = l + "px",
    e.style.removeProperty("padding-top"),
    e.style.removeProperty("padding-bottom"),
    e.style.removeProperty("margin-top"),
    e.style.removeProperty("margin-bottom"),
    window.setTimeout(()=>{
        e.style.removeProperty("height"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        e.classList.remove("_slide")
    }
    , t)
}
  , _slideToggle = (e,t=500)=>{
    if (!e.classList.contains("_slide"))
        return e.classList.add("_slide"),
        "none" === window.getComputedStyle(e).display ? _slideDown(e, t) : _slideUp(e, t)
}

  , _slideWidthShrink = (e,t=500)=>{
    e.style.transitionProperty = "width, margin, padding",
    e.style.transitionDuration = t + "ms",
    e.style.width = e.offsetWidth + "px",
    e.offsetWidth,
    e.style.overflow = "hidden",
    e.style.width = 0,
    e.style.paddingRight = 0,
    e.style.paddingLeft = 0,
    e.style.marginRight = 0,
    e.style.marginLeft = 0,
    window.setTimeout(()=>{
        e.style.display = "none",
        e.style.removeProperty("width"),
        e.style.removeProperty("padding-right"),
        e.style.removeProperty("padding-left"),
        e.style.removeProperty("margin-right"),
        e.style.removeProperty("margin-left"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        e.classList.remove("_slide")
    }
    , t)
}
  , _slideWidthGrow = (e,t=500)=>{
    e.style.removeProperty("display");
    let o = window.getComputedStyle(e).display;
    "none" === o && (o = "inline-block"),
    e.style.display = o;
    let l = e.offsetWidth;
    e.style.overflow = "hidden",
    e.style.width = 0,
    e.style.paddingTop = 0,
    e.style.paddingBottom = 0,
    e.style.marginTop = 0,
    e.style.marginBottom = 0,
    e.offsetWidth,
    e.style.transitionProperty = "width, margin, padding",
    e.style.transitionDuration = t + "ms",
    e.style.width = l + "px",
    e.style.removeProperty("padding-right"),
    e.style.removeProperty("padding-left"),
    e.style.removeProperty("margin-right"),
    e.style.removeProperty("margin-left"),
    window.setTimeout(()=>{
        e.style.removeProperty("width"),
        e.style.removeProperty("overflow"),
        e.style.removeProperty("transition-duration"),
        e.style.removeProperty("transition-property"),
        e.classList.remove("_slide")
    }
    , t)
}
  , _slideWidthToggle = (e,t=500)=>{
    if (!e.classList.contains("_slide"))
        return e.classList.add("_slide"),
        "none" === window.getComputedStyle(e).display ? _slideWidthGrow(e, t) : _slideWidthShrink(e, t)
};

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
    let mainslider = new Swiper(".mainslider__body", {
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
/* if (document.querySelector('.products-slider')){
    let productsSlider = new Swiper(".products-slider__item", {
        //  autoplay: {
        //     delay: 1e4,
        //     disableOnInteraction: !1
        // },
        observer: !0,
        observeParents: !0,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        preloadImages: !1,
        lazy: {
            loadPrevNext: !0
        },
        // pagination: {
        //     el: ".mainslider__dotts",
        //     clickable: !0
        // },
        navigation: {
            nextEl: ".products-slider__arrow--next",
            prevEl: ".products-slider__arrow--prev",
        },
    });
}
 */

/* if (document.querySelector(".products-slider")) {
    new Swiper(".products-slider__body",{
        observer: !0,
        observeParents: !0,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 28,
        autoHeight: !1,
        speed: 800,
        loop: !0,
        lazy: {
            loadPrevNext: !0
        },
        pagination: {
            el: ".products-slider__info",
            type: "fraction"
        },
        navigation: {
            nextEl: ".products-slider__arrow--next",
            prevEl: ".products-slider__arrow--prev"
        },
        breakpoints: {
            280: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0,
                autoHeight: !0
            },
            567.98: {
                slidesPerView: 2,
                slidesPerGroup: 2
            },
            1100: {
                slidesPerView: 3,
                slidesPerGroup: 3
            }
        }
    })
} */
if (document.querySelector(".products-slider")) {
    new Swiper(".products-slider__item", {
        observer: !0,
        observeParents: !0,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: !0,
        speed: 800,
        pagination: {
            el: ".products-slider__info",
            type: "fraction"
        },
        navigation: {
            nextEl: ".products-slider__arrow--next",
            prevEl: ".products-slider__arrow--prev"
        },
        /* on: {
            lazyImageReady: function () {
                ibg()
            }
        } */
    })
}

/* let itemProductImages = document.querySelectorAll(".item-product__image"),
    body = document.querySelector("body");
if (itemProductImages && body.offsetWidth > 991.98)
    for (let e = 0; e < itemProductImages.length; e++) {
        const t = itemProductImages[e],
            o = t.parentElement,
            l = o.querySelector(".item-product__hover");
        l && (t.addEventListener("mouseenter", e => {
            o.classList.add("_active")
        }), l.addEventListener("mouseleave", e => {
            o.classList.remove("_active")
        }))
    }
 */

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

// разворот бургера
//===========
let menuPageBurger = document.querySelector('.menu-page__burger');
let menuPageBody = document.querySelector('.menu-page__body');
menuPageBurger.addEventListener('click', function(e){
    menuPageBurger.classList.toggle('_active');
    _slideToggle(menuPageBody);
    //ваще можно было к одному классу прописать одинаковые стили по идее, но мы экономим время поэтому делаем вот так вот
});

// разворот сайд-подменю на десктопе и мобилках
//===========
let menuParent = document.querySelectorAll('.menu-page__parent');
let menuParents = document.querySelectorAll('.menu-page__parent>a');

if(isMobile.any() || document.documentElement.clientWidth <= 991.98){
    for (let index = 0; index < menuParents.length; index++) {
        const menuParent = menuParents[index];
        const submenuItems = menuParents[index].parentElement.querySelector('.submenu-page__item');
        menuParent.addEventListener('click', function(e){
            menuParent.parentElement.classList.toggle('_active'),
            _slideToggle(submenuItems),
            e.preventDefault();
        });
    }
    }else{

        for (let index = 0; index < menuParent.length; index++){
            menuParent[index].addEventListener("mouseenter", (function(){
                menuParent[index].classList.add('_active');
            }
            )),
            menuParent[index].addEventListener("mouseleave", (function(){
                menuParent[index].classList.remove('_active');
            }
            ));
        }
    }

document.querySelector(".icon-menu").addEventListener("click", () => {
document.querySelector(".icon-menu").classList.toggle("_active"), document.querySelector(".menu__body").classList.toggle("_active")
});

// разворот поиска по категориям
//===========
let searchSelect= document.querySelector('.search-page__select');
let categoriesSearch = document.querySelector('.categories-search');
searchSelect.addEventListener('click', function(e){
    searchSelect.classList.toggle('_active');
    _slideToggle(categoriesSearch);
});

// чекбоксы
//===========
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

//===========
//.swiper-pagination-bullets .swiper-pagination-horizontal
/* let HUETA_EBUCHAYA = document.querySelector('.mainslider__dotts');
HUETA_EBUCHAYA.classList.remove('swiper-pagination-horizontal'); */

/* let bespoleznayaDich = document.querySelector('.products-slider__info');
bespoleznayaDich.classList.remove('.swiper-pagination-fraction'); */




//# sourceMappingURL=main.js.map
