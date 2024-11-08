const router = require('express').Router();
router.get("", (req, res) => res.render('home'));
["json", "svg"].forEach(route => router.use(`/${route}`, require(`./${route}`)));
module.exports = router;
