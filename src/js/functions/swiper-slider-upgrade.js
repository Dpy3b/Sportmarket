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

