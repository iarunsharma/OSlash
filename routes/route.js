const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const urlController = require("../controllers/urlController");
const mid = require("../middlewares/appMiddleware");
const validator = require("../middlewares/validator");

router.post("/user", validator.checkuser, userController.createUser);

router.post("/login", userController.login);

router.post("/url", mid.mw, urlController.shortcut);

router.get("/:urlCode", urlController.geturl);

router.get("/urlList", urlController.getUrlList);

router.get("/urlfilter", urlController.filterurl);

router.delete("/url/:urlId", mid.mw, urlController.deleteShortcut);

module.exports = router;
