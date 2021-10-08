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
