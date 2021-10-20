/* let checkout = document.querySelector(".checkout")
  , checkoutLine = checkout.querySelectorAll(".form-checkout__line")
  , dataValue = !1;
if (checkoutLine)
    for (let e = 0; e < checkoutLine.length; e++) {
        checkoutLine[e].querySelector("input, textarea").setAttribute("data-value", "")
    }
function setDataValue(e) {
    if (checkoutLine)
        for (let e = 0; e < checkoutLine.length; e++) {
            const t = checkoutLine[e].querySelector("input, textarea");
            let o = checkoutLine[e].querySelector(".form-checkout__label");
            o = o.innerHTML.replace("<span>", "").replace("</span>", "").replace(":", ""),
            t && t.setAttribute("data-value", o)
        }
}
function placeholder(e) {
    if (checkoutLine)
        if (window.innerWidth <= 767.98) {
            if (!dataValue) {
                setDataValue();
                for (let e = 0; e < checkoutLine.length; e++) {
                    const t = checkoutLine[e].querySelector("input, textarea");
                    t && input_placeholder_add(t)
                }
                dataValue = !0
            }
        } else if (dataValue) {
            for (let e = 0; e < checkoutLine.length; e++) {
                const t = checkoutLine[e].querySelector("input, textarea");
                t && (t.value = "",
                t.setAttribute("data-value", ""))
            }
            dataValue = !1
        }
}
inputs = document.querySelectorAll("input[data-value],textarea[data-value]"),
inputs_init(inputs),
placeholder();
 */

//доработать это дело в формах checkout
