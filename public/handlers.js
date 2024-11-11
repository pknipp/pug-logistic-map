console.log("Hello from handlers.js");
const toggleVisibility = path => {
    let visible = path.getAttribute("visibility") === "visible";
    path.setAttribute("visibility", visible ? "hidden" : "visible");
};
const setRadii = (circles, newSize) => {
    let circle0 = circles[0];
    sizes = [
        {
            label: "small",
            factor: 0.2,
        }, {
            label: "medium",
            factor: 1,
        }, {
            label: "large",
            factor: 5,
        },
    ];
    let currentIndex = sizes.indexOf(circle0.getAttribute("class"));
    let currentRadius = Number(circle0.getAttribute("r"));
    let radiusFactors = [0.2, 1, 5];
    let rawRadius = currentRadius / sizes[currentIndex].factor;
    let newIndex = sizes.map(size => size.factor).indexOf(newSize);
    let newRadius = rawRadius * sizes[newIndex].factor;
    circles.forEach(circle => {
      circle.setAttribute("class", newSize);
      circle.setAttribute("r", newRadius);
    });
}
let path = document.getElementsByTagName("path")[0];
let button = document.getElementsByTagName("button")[0];
button.addEventListener("click", e => {
  toggleVisibility(path);
});
