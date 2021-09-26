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
