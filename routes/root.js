const express = require("express");
const router = express.Router();
const path = require("path");

// ^/$: This part of the regex matches the root directory of a URL. Let's break it down further:
// ^: Denotes the start of the string.
// /: Matches the forward slash character "/".
// $: Denotes the end of the string.
// So, the combination ^/$ ensures that the regex matches only when the entire string consists of a single forward slash, representing the root directory of a URL.
// index: Matches the literal characters "/index".(.html)?: This is a group with ? which makes it optional.

router.get("^/$|/index(.html)?", (req, res) => {
    // path wrt to curent fileURLToPath, ../ will take it out of routes folder
    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
});

module.exports = router;
