"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const download_controller_1 = require("./download.controller");
const downloadRouter = express_1.default.Router();
downloadRouter.post("/", download_controller_1.handleVideoBuffer);
exports.default = downloadRouter;
