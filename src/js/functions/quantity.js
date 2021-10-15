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
