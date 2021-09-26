
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
