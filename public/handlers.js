const urlFrag = 'herokuapp.com/3.54-100-0.42';
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
    let currentRadius = Number(circle0.getAttribute("r"));
    let labels = sizes.map(size => size.label);
    let currentIndex = labels.indexOf(circle0.getAttribute("class"));
    let rawRadius = currentRadius / sizes[currentIndex].factor;
    let newIndex = labels.indexOf(newSize);
    let newRadius = rawRadius * sizes[newIndex].factor;
    circles.forEach(circle => {
      circle.setAttribute("class", newSize);
      circle.setAttribute("r", newRadius);
    });
}
let path = document.getElementsByTagName("path")[0];
let button = document.getElementsByTagName("button")[0];
button.addEventListener("click", e => toggleVisibility(path));
let circles = Array.from(document.getElementsByTagName("circle"));
let inputs = Array.from(document.getElementsByTagName("input"));
inputs.forEach(input => {
    input.addEventListener("click", e => {
        setRadii(circles, e.target.getAttribute("value"));
    });
});
