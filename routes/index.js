const router = require('express').Router();
router.get("", (req, res) => res.render('home'));
// ["json", "svg"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
router.use("/", require("./svg"));
router.use("/api", require("./json"));
module.exports = router;
