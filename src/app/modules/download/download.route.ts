import express from "express";
import {
  handleVideoBuffer,
} from "./download.controller";

const downloadRouter = express.Router();

downloadRouter.post("/", handleVideoBuffer);

export default downloadRouter;
