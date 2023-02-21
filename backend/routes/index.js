const express = require('express');
const router = express.Router();
const apiRouter = require('./api');




//middlewear directing all /api calls to correct folder
router.use('/api', apiRouter);



// Add a XSRF-TOKEN cookie in dev NOT production once finished
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
module.exports = router;
