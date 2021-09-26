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
let HUETA_EBUCHAYA = document.querySelector('.mainslider__dotts');
HUETA_EBUCHAYA.classList.remove('swiper-pagination-horizontal');




