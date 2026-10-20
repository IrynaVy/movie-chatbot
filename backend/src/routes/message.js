const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const userText = req.body.text;

    res.json({
        reply: `Ти написала: "${userText}". Я скоро навчуся радити фільми!`
    });
});

module.exports = router;
