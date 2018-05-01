const express = require('express');
const app = express();
const routes = require('./api/routes');
const cors = require('cors');

app.use(cors());

routes.registerRoutes(app);


app.listen(4000);
