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
