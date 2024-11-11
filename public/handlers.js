const toggleVisibility = path => {
    let visible = path.getAttribute("visibility") === "visible";
    path.setAttribute("visibility", visible ? "hidden" : "visible");
};
const setRadii = (circles, newSize) => {
    console.log("top of setRadii");
    let circle0 = circles[0];
    sizes = [
        {
            label: "small",
            factor: 0.2,
            isChecked: false,
        }, {
            label: "medium",
            factor: 1,
            isChecked: true,
        }, {
            label: "large",
            factor: 5,
            isChecked: false,
        },
    ];
    let currentIndex = sizes.indexOf(circle0.getAttribute("class"));
    console.log(currentIndex);
    let currentRadius = Number(circle0.getAttribute("r"));
    console.log(currentRadius);
    let rawRadius = currentRadius / sizes[currentIndex].factor;
    console.log(rawRadius);
    let newIndex = sizes.map(size => size.label).indexOf(newSize);
    console.log(newIndex);
    let newRadius = rawRadius * sizes[newIndex].factor;
    console.log(newRadius);
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
let circles = Array.from(document.getElementsByTagName("circle"));
console.log("circles = ", circles);
let inputs = Array.from(document.getElementsByTagName("input"));
inputs.forEach(input => {
    input.addEventListener("click", e => {
        setRadii(circles, e.target.getAttribute("value"));
    });
});
