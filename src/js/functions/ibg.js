function ibg() {
    if (isIE()) {
        let t = document.querySelectorAll("._ibg");
        for (var e = 0; e < t.length; e++)
            t[e].querySelector("img") && null != t[e].querySelector("img").getAttribute("src") && (t[e].style.backgroundImage = "url(" + t[e].querySelector("img").getAttribute("src") + ")")
    }
}
