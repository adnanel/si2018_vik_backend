const express = require('express');
const app = express();
const routes = require('./api/routes');
const cors = require('cors');

app.use(cors());

routes.registerRoutes(app);

app.get("/", function(req, res) {
    res.send("API endpoint works.");
});

app.listen(process.env.PORT || 8080);
