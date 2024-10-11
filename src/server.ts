import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT || 5000;

require("dotenv").config();
// conncet with mongodb atlas
const mongoUrl = `${process.env.MONGODB_URL}`;
const mongooseOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
};
async function mongodbConnect() {
  try {
    await mongoose.connect(mongoUrl, mongooseOptions);
    console.log("databes connected");
    app.get("/api", (req, res) => {
      res.send("Website is running through AWS and i am testing CICD setup");
    });
    app.listen(port, () => {
      console.log(` app listening on port ${port}`);
    });
  } catch (e) {
    console.log("server err", e);
  }
}

mongodbConnect();
