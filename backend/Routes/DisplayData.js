const express = require("express");
const router = express.Router();

router.get("/fooddata", (req, res) => {
  try {
    res.send([global.food_items, global.foodCategory]);
  } catch (e) {
    console.error(e.message);
    res.send("server error");
  }
});

module.exports = router;
