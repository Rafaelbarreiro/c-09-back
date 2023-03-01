const {conectarDB} = require ('./db.js')
const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors")
const app = express();
const userRoute = require('./routes/userRoute');
const populateRouter = require ('./routes/populateRoute');
const categoryRoutes = require ('./routes/categoryRoutes');
const cardsRoute = require ('./routes/CardsRoutes');
const emailRoute = require ('./routes/emailRoute');
const donationRoutes = require ('./routes/donationRoutes');
const server = express();
const morgan = require("morgan");




dotenv.config();
conectarDB();
app.use(express.json());

app.use(
    cors({
      origin: '*',
      credentials: true,
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'authorization',
      ],
    })
  );
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//Routing
app.use("/users", userRoute);
app.use("/populate", populateRouter);
app.use("/categories", categoryRoutes);
app.use("/cards", cardsRoute);
app.use("/email", emailRoute);
app.use("/donations", donationRoutes);

const PORT = process.env.PORT || 3001;
const servidor = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
  });
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
