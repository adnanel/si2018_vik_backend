const express = require('express');
const app = express();
const routes = require('./api/routes');

routes.registerRoutes(app);


app.listen(4000);
