"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdftoWhatsapp = exports.uploadPDF = exports.deleteImgFunction = exports.deleteImg = exports.uploadImg = void 0;
const fs_1 = __importDefault(require("fs"));
const aws_services_1 = require("./services/aws.services");
const promises_1 = require("fs/promises");
// add images 
const uploadImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "It must have an media" });
        }
        if (file.size > 10000000) { // 10MB
            return res.status(400).json({ message: "Media should be less than 10 MB" });
        }
        const result = yield (0, aws_services_1.uploadFile)(file);
        yield (0, promises_1.unlink)(file.path);
        return res.status(200).json({ result });
    }
    catch (e) {
        console.log("error----->", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.uploadImg = uploadImg;
const deleteImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("deleteImg", req.body);
        const isDelete = yield (0, aws_services_1.deleteFile)(req.body.key);
        return res.status(200).json({ isDelete });
    }
    catch (e) {
        console.log("error----->", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteImg = deleteImg;
const deleteImgFunction = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDelete = yield (0, aws_services_1.deleteFile)(key);
        return isDelete;
    }
    catch (e) {
        console.log("error----->", e);
        return "Internal server error";
    }
});
exports.deleteImgFunction = deleteImgFunction;
function uploadPDF(file, filename, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("path--->", file);
            // creating fileStream
            const fileStream = fs_1.default.createReadStream(file);
            // creating uploading param
            const uploadParams = {
                Bucket: aws_services_1.bucketName,
                Body: fileStream,
                Key: filename,
                ContentType: 'application/pdf',
            };
            const result = yield aws_services_1.s3.upload(uploadParams).promise();
            return res.json({
                pdfLink: result
            });
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    });
}
exports.uploadPDF = uploadPDF;
const uploadPdftoWhatsapp = (pdfLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContent = fs_1.default.readFileSync(pdfLink);
        const params = {
            Bucket: aws_services_1.bucketName,
            Key: `INVOICE.pdf`,
            Body: fileContent,
            ContentType: 'application/pdf',
        };
        return aws_services_1.s3.upload(params).promise();
    }
    catch (e) {
        console.log("error----->", e);
        return "Internal server error";
    }
});
exports.uploadPdftoWhatsapp = uploadPdftoWhatsapp;
