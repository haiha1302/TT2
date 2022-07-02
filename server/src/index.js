const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
const port = process.env.PORT || 5000;

//config
dotenv.config({ path: "src/config/.env" });

//database
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
const user = require("./routes/userRoutes");
const post = require("./routes/postRoute");
app.use("/v1/user", user);
app.use("/v1/post", post);

app.listen(port, () => console.log(`Server run ${port}`));
