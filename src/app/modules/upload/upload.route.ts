// upload.route.js
import { Request, Response } from "express";
import multer from 'multer';
import { deleteImg, uploadImg } from './upload.controller'

const upload = multer({ dest: 'uploads/' })
const uploadRouter = require("express").Router();
uploadRouter.post('/', upload.single('image'), uploadImg);
uploadRouter.post('/delete', deleteImg);

/*To handle all invalid request */
uploadRouter.all("*", (req: Request, res: Response) => {
    res.status(404).json({ status: "failed", message: res });
});

export default uploadRouter;