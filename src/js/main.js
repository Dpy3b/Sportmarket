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

