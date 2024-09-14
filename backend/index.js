const express = require("express");
const mongodbConnection = require("./dbcon");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

mongodbConnection(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const userroute = require("./routes/Userroute");
const listingRoutes = require("./routes/Listingroute");
const Userdetailroute = require("./routes/Userdetailroute");
const Bookingroute = require("./routes/Bookingroute")


app.use("/api", userroute);
app.use("/properties", listingRoutes);
app.use("/Userdetails", Userdetailroute);
app.use("/Bookings", Bookingroute)

app.listen(8003, () => {
  console.log("server is listening on 8003");
});
