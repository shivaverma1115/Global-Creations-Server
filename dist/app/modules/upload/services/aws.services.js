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
exports.deleteFile = exports.uploadFile = exports.s3 = exports.secretAccessKey = exports.accessKeyId = exports.region = exports.bucketName = void 0;
const fs_1 = __importDefault(require("fs")); // Import for asynchronous file reading
const aws_sdk_1 = require("aws-sdk");
// Load environment variables with type safety
exports.bucketName = process.env.AWS_BUCKET_NAME;
exports.region = process.env.AWS_BUCKET_REGION;
exports.accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY;
exports.secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;
// Configure S3 client
exports.s3 = new aws_sdk_1.S3({
    region: exports.region,
    accessKeyId: exports.accessKeyId,
    secretAccessKey: exports.secretAccessKey,
});
// Improved uploadFile function
function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // creating fileStream
            const fileStream = fs_1.default.createReadStream(file.path);
            // creating uploading param
            const uploadParams = {
                Bucket: exports.bucketName,
                Body: fileStream,
                Key: file.filename + '.' + file.mimetype.split('/')[1],
                ContentType: file.mimetype,
                ACL: 'public-read'
            };
            const result = yield exports.s3.upload(uploadParams).promise();
            return result;
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    });
}
exports.uploadFile = uploadFile;
function deleteFile(Key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteParams = {
                Bucket: exports.bucketName,
                Key
            };
            yield exports.s3.deleteObject(deleteParams).promise();
            return true;
        }
        catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    });
}
exports.deleteFile = deleteFile;
