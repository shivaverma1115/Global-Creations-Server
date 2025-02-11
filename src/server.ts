import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT || 8000;

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
    app.listen(port, () => {
      console.log(` app listening on port ${port}`);
    });
  } catch (e) {
    console.log("server err", e);
  }
}

mongodbConnect();
