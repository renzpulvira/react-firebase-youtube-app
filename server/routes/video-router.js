const express = require("express");

const videoCtrl = require("../controllers/video-ctrl");

const router = express.Router();

router.post("/video", videoCtrl.addVideo);

module.exports = router;
