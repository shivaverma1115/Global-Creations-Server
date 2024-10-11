"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = require("./upload.controller");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const uploadRouter = require("express").Router();
uploadRouter.post('/', upload.single('image'), upload_controller_1.uploadImg);
uploadRouter.post('/delete', upload_controller_1.deleteImg);
/*To handle all invalid request */
uploadRouter.all("*", (req, res) => {
    res.status(404).json({ status: "failed", message: res });
});
exports.default = uploadRouter;
