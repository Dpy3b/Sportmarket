let forms = document.querySelectorAll("form");
if (forms.length > 0)
    for (let e = 0; e < forms.length; e++) {
        forms[e].addEventListener("submit", form_submit)
    }
async function form_submit(e) {
    let t = e.target.closest("form");
    if (0 == form_validate(t)) {
        let o = t.getAttribute("action") ? t.getAttribute("action").trim() : "#",
            l = t.getAttribute("method") ? t.getAttribute("method").trim() : "GET";
        const r = t.getAttribute("data-message");
        if (t.getAttribute("data-ajax")) {
            e.preventDefault();
            let n = new FormData(t);
            t.classList.add("_sending");
            let i = await fetch(o, {
                method: l,
                body: n
            });
            if (i.ok) {
                await i.json();
                t.classList.remove("_sending"), r && popup_open("_" + r + "-message"), form_clean(t)
            } else alert("Ошибка"), t.classList.remove("_sending")
        }
    } else {
        let o = t.querySelectorAll("._error");
        o && t.classList.contains("_goto-error") && _goto(o[0], 1e3, 50), e.preventDefault()
    }
}

function form_validate(e) {
    let t = 0,
        o = e.querySelectorAll("._req");
    if (o.length > 0)
        for (let e = 0; e < o.length; e++) {
            const l = o[e];
            _is_hidden(l) || (t += form_validate_input(l))
        }
    return t
}

function form_validate_input(e) {
    let t = 0,
        o = e.getAttribute("data-value");
    if ("email" == e.getAttribute("name") || e.classList.contains("_email")) {
        if (e.value != o) {
            let t = e.value.replace(" ", "");
            e.value = t
        }
        email_test(e) || e.value == o ? (form_add_error(e), t++) : form_remove_error(e)
    } else "checkbox" == e.getAttribute("type") && 0 == e.checked || "" == e.value || e.value == o ? (form_add_error(e), t++) : form_remove_error(e);
    return t
}

function form_add_error(e) {
    e.classList.add("_error"), e.parentElement.classList.add("_error");
    let t = e.parentElement.querySelector(".form__error");
    t && e.parentElement.removeChild(t);
    let o = e.getAttribute("data-error");
    o && "" != o && e.parentElement.insertAdjacentHTML("beforeend", '<div class="form__error">' + o + "</div>")
}

function form_remove_error(e) {
    e.classList.remove("_error"), e.parentElement.classList.remove("_error");
    let t = e.parentElement.querySelector(".form__error");
    t && e.parentElement.removeChild(t)
}

function form_clean(e) {
    let t = e.querySelectorAll("input,textarea");
    for (let e = 0; e < t.length; e++) {
        const o = t[e];
        o.parentElement.classList.remove("_focus"), o.classList.remove("_focus"), o.value = o.getAttribute("data-value")
    }
    let o = e.querySelectorAll(".checkbox__input");
    if (o.length > 0)
        for (let e = 0; e < o.length; e++) {
            o[e].checked = !1
        }
    let l = e.querySelectorAll("select");
    if (l.length > 0)
        for (let e = 0; e < l.length; e++) {
            const t = l[e],
                o = t.getAttribute("data-default");
            t.value = o, select_item(t)
        }
}
let viewPass = document.querySelectorAll(".form__viewpass");
for (let e = 0; e < viewPass.length; e++) {
    const t = viewPass[e];
    t.addEventListener("click", (function (e) {
        t.classList.contains("_active") ? t.parentElement.querySelector("input").setAttribute("type", "password") : t.parentElement.querySelector("input").setAttribute("type", "text"), t.classList.toggle("_active")
    }))
}

let selects = document.getElementsByTagName("select");

function selects_init() {
    for (let e = 0; e < selects.length; e++) {
        select_init(selects[e])
    }
    document.addEventListener("click", (function (e) {
        selects_close(e)
    })), document.addEventListener("keydown", (function (e) {
        "Escape" === e.code && selects_close(e)
    }))
}

function selects_close(e) {
    const t = document.querySelectorAll(".select");
    if (!e.target.closest(".select"))
        for (let e = 0; e < t.length; e++) {
            const o = t[e],
                l = o.querySelector(".select__options");
            o.classList.remove("_active"), _slideUp(l, 100)
        }
}

function select_init(e) {
    const t = e.parentElement,
        o = e.getAttribute("class"),
        l = e.querySelector("option:checked");
    e.setAttribute("data-default", l.value), e.style.display = "none", t.insertAdjacentHTML("beforeend", '<div class="select select_' + o + '"></div>'), e.parentElement.querySelector(".select").appendChild(e), select_item(e)
}

function select_item(e) {
    const t = e.parentElement,
        o = t.querySelector(".select__item"),
        l = e.querySelectorAll("option"),
        r = e.querySelector("option:checked").text,
        n = e.getAttribute("data-type");
    o && o.remove();
    let i = "";
    i = "input" == n ? '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + r + '" data-error="Ошибка" data-value="' + r + '" class="select__input"></div>' : '<div class="select__value icon-select-arrow"><span>' + r + "</span></div>", t.insertAdjacentHTML("beforeend", '<div class="select__item"><div class="select__title">' + i + '</div><div class="select__options">' + select_get_options(l) + "</div></div></div>"), select_actions(e, t)
}

function select_actions(e, t) {
    const o = t.querySelector(".select__item"),
        l = t.querySelector(".select__options"),
        r = t.querySelectorAll(".select__option"),
        n = e.getAttribute("data-type"),
        i = t.querySelector(".select__input");
    o.addEventListener("click", (function () {
        let e = document.querySelectorAll(".select");
        for (let t = 0; t < e.length; t++) {
            const l = e[t],
                r = l.querySelector(".select__options");
            l != o.closest(".select") && (l.classList.remove("_active"), _slideUp(r, 100))
        }
        _slideToggle(l, 100), t.classList.toggle("_active")
    }));
    for (let o = 0; o < r.length; o++) {
        const l = r[o],
            s = l.getAttribute("data-value"),
            c = l.innerHTML;
        "input" == n ? i.addEventListener("keyup", select_search) : l.getAttribute("data-value") == e.value && (l.style.display = "none"), l.addEventListener("click", (function () {
            for (let e = 0; e < r.length; e++) {
                r[e].style.display = "block"
            }
            "input" == n ? (i.value = c, e.value = s) : (t.querySelector(".select__value").innerHTML = "<span>" + c + "</span>", e.value = s, l.style.display = "none")
        }))
    }
}

function select_get_options(e) {
    if (e) {
        let t = "";
        for (let o = 0; o < e.length; o++) {
            const l = e[o],
                r = l.value;
            if ("" != r) {
                t = t + '<div data-value="' + r + '" class="select__option">' + l.text + "</div>"
            }
        }
        return t
    }
}

function select_search(e) {
    e.target.closest(".select ").querySelector(".select__options");
    let t = e.target.closest(".select ").querySelectorAll(".select__option"),
        o = e.target.value.toUpperCase();
    for (let e = 0; e < t.length; e++) {
        let l = t[e];
        (l.textContent || l.innerText).toUpperCase().indexOf(o) > -1 ? l.style.display = "" : l.style.display = "none"
    }
}

function selects_update_all() {
    let e = document.querySelectorAll("select");
    if (e)
        for (let t = 0; t < e.length; t++) {
            select_item(e[t])
        }
}
selects.length > 0 && selects_init();

function ibg() {
    if (isIE()) {
        let t = document.querySelectorAll("._ibg");
        for (var e = 0; e < t.length; e++)
            t[e].querySelector("img") && null != t[e].querySelector("img").getAttribute("src") && (t[e].style.backgroundImage = "url(" + t[e].querySelector("img").getAttribute("src") + ")")
    }
}

let quantityButtons = document.querySelectorAll(".quantity__button");
if (quantityButtons.length > 0)
    for (let e = 0; e < quantityButtons.length; e++) {
        const t = quantityButtons[e];
        t.addEventListener("mousedown", (function(e) {
            let o = parseInt(t.closest(".quantity").querySelector("input").value);
            t.classList.contains("quantity__button--plus") ? o++ : (o -= 1,
            o < 1 && (o = 1)),
            t.closest(".quantity").querySelector("input").value = o
        }
        ))
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

// тотальная заготовочка Жеки
// P.S. стилей там никаких не было, типа всё сами должны
let spollers = document.querySelectorAll("._spoller"),
    spollersGo = !0;
if (spollers.length > 0)
    for (let e = 0; e < spollers.length; e++) {
        const t = spollers[e];
        t.addEventListener("click", (function (e) {
            if (spollersGo) {
                if (spollersGo = !1, t.classList.contains("_spoller-992") && window.innerWidth > 992) return !1;
                if (t.classList.contains("_spoller-768") && window.innerWidth > 768) return !1;
                if (t.closest("._spollers").classList.contains("_one")) {
                    let e = t.closest("._spollers").querySelectorAll("._spoller");
                    for (let o = 0; o < e.length; o++) {
                        let l = e[o];
                        l != t && (l.classList.remove("_active"), _slideUp(l.nextElementSibling))
                    }
                }
                t.classList.toggle("_active"), _slideToggle(t.nextElementSibling), setTimeout((function () {
                    spollersGo = !0
                }), 500)
            }
        }))
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
    new Swiper(".products-slider__item", { //либо вначале let imagesSliderProduct = new Swiper(и т.д.)
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

let itemProductImages = document.querySelectorAll(".item-product__image"),
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
    };

// тут траблы касающиеся чисто события mouseenter

if (document.querySelector(".brands-slider")) {
    new Swiper(".brands-slider__body",{ //либо вначале let imagesSliderProduct = new Swiper(и т.д.)
        observer: !0,
        observeParents: !0,
        slidesPerView: 5,
        spaceBetween: 0,
        autoHeight: !0, // здесь должно быть !1, но для этого надо избавляться от стилей тех чуваков
        speed: 600,
        loop: !0,
        lazy: {
            loadPrevNext: !0
        },

        navigation: {
            nextEl: ".brands-slider__arrow--next",
            prevEl: ".brands-slider__arrow--prev"
        },
        breakpoints: {
            280: {
                slidesPerView: 1
            },
            567.98: {
                slidesPerView: 2
            },
            767.98: {
                slidesPerView: 3
            },
            991.98: {
                slidesPerView: 4
            },
            1100: {
                slidesPerView: 5
            }
        }
        /* on: {
            lazyImageReady: function () {
                ibg()
            }
        } */
    })
};



if (document.querySelector(".images-product")) {
    let imagesProductSubslider = new Swiper(".images-product__subslider",{ //либо вначале let imagesSliderProduct = new Swiper(и т.д.)
        observer: !0,
        observeParents: !0,
        slidesPerView: 4,
        spaceBetween: 0,
        //autoHeight: !0, // здесь должно быть !1, но для этого надо избавляться от стилей тех чуваков
        speed: 800,
        //loop: !0,
        lazy: {
            loadPrevNext: !0
        },
    });
    let imagesProductMainslider = new Swiper(".images-product__mainslider",{ //либо вначале let imagesSliderProduct = new Swiper(и т.д.)
        observer: !0,
        observeParents: !0,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: !0, // здесь должно быть !1, но для этого надо избавляться от стилей тех чуваков
        speed: 800,
        //loop: !0,
        lazy: {
            loadPrevNext: !0
        },
        thumbs: {
            swiper: imagesProductSubslider,
        }
    });

}


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
bespoleznayaDich.classList.remove('swiper-pagination-fraction'); */



// digi////// типа для форматирования чисел после точки в длинных числах с дробями, из шаблона Жеки, надо понять как оно работает, но мы уже либой wNumb воспользовались
/* function digi(e) {
    return e.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")
}

function digi_animate(e) {
    if (e.length > 0)
        for (let t = 0; t < e.length; t++) {
            const o = e[t],
                l = parseInt(o.innerHTML.replace(" ", ""));
            o.classList.contains("_done") || digi_animate_value(o, 0, l, 1500)
        }
}

function digi_animate_value(e, t, o, l) {
    var r = e,
        n = o - t,
        i = Math.abs(Math.floor(l / n));
    i = Math.max(i, 50);
    var s, c = (new Date).getTime() + l;

    function a() {
        var e = (new Date).getTime(),
            t = Math.max((c - e) / l, 0),
            i = Math.round(o - t * n);
        r.innerHTML = digi(i), i == o && clearInterval(s)
    }
    s = setInterval(a, i), a(), e.classList.add("_done")
} */
//////////////


// noUiSlider.js

const priceSlider = document.querySelector('.price-filter__slider');

noUiSlider.create(priceSlider, {
    start: [0, 200000],
    tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})], //кароче либа wNumb для кол-ва чисел после точки, доки есть на оф. сайтах
    range: {
        'min': 0,
        'max': 200000
    },
    connect: true
});

const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
priceStart.addEventListener('change', setPricesValues);
priceEnd.addEventListener('change', setPricesValues);

function setPricesValues() {
    let priceStartValue;
    let priceEndValue;
    if(priceStart.value != ''){
        priceStartValue = priceStart.value;
    }
    if(priceEnd.value != ''){
        priceEndValue = priceEnd.value;
    }
    priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
    // в noUiSlider изначально есть прекол который сохраняет исходное положение конца ползунка если значение инпута пустое, оно помогло нам решить задачу выше
}

if(isMobile.any()){
    let filterTitle = document.querySelector('.filter__title');
    filterTitle.addEventListener('click', function(e){
        filterTitle.classList.toggle('_active');
        _slideToggle(filterTitle.nextElementSibling);
    });
}


//# sourceMappingURL=main.js.map
