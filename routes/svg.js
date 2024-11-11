const router = require('express').Router();
const {parseParams, map} = require("./utils");

router.get('', (req, res) => {
  res.status(500);
  res.send(`<p>You neglected to include inputs in the url.</p>`);
});

router.get('/:rNmaxNmin', (req, res) => {
  let params = req.params.rNmaxNmin.split("-");
  let rFactor = Number(params[0]);
  let [error, ys] = parseParams(params);
  if (error) {
    res.status(500);
    res.send(`<p>${error}</p>`);
  } else {
    let svg = {size: {x: 1600, y: 850}, padding: {x: 70, y: 60}};
    let rect = {size: {x: svg.size.x - svg.padding.x, y: svg.size.y - 2 * svg.padding.y}};
    const sizes = [
      {
        label: "small",
        radius: 0.2,
        isChecked: false,
      },{
        label: "medium",
        radius: 1,
        isChecked: true,
      },{
        label: "large",
        radius: 5,
        isChecked: false,
      }
    ];

    let n = ys.length;
    // double size of dots w/each period-doubling transition
    let r = Math.min(rect.size.x / 2 / (1 + (n - 1) / 2 ** (rFactor < 3 ? 0 : rFactor < 3.44949 ? 1 : rFactor < 3.54409 ? 2 : 3)), rect.size.y / 20);
    rect.padding = r;

    let xys = ys.map((y, i) => ([
      rect.padding + i * (rect.size.x - 2 * rect.padding) / (n - 1),
      rect.size.y - rect.padding - y * (rect.size.y - 2 * rect.padding),
    ]));
    let points = "";
    let d = "";
    xys.forEach(([x, y], i) => {
      d += `${i ? "L" : "M"}${x},${y}`;
    });
    let nMax = 14.14 // from reverse-engineering storybook
    let dN = xys.length / nMax;
    let pow = 10 ** Math.floor(Math.log10(dN));
    dN /= pow;
    dN = dN > 5 ? 10 : dN > 2 ? 5 : 2;
    dN *= pow;
    res.render("svg", {sizes, svg, rect, rFactor, xys, r, d, dN});
  }
});
module.exports = router;
