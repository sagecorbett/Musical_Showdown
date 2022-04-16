const express = require("express");
const router = express.Router();
const { getSolo, postSolo } = require("../controllers/soloController");


router.get("/", getSolo);

router.post("/", postSolo);

module.exports = router;
