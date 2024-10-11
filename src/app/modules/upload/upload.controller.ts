import fs from 'fs';
import util from 'util';
import { Request, Response } from "express";
import { bucketName, deleteFile, uploadFile, region, accessKeyId, secretAccessKey, s3 } from './services/aws.services'
import { unlink } from 'fs/promises';
import path from "path";

// add images 
export const uploadImg = async (req: Request, res: Response) => {
    try {
        const file: any = req.file;
        if (!file) {
            return res.status(400).json({ message: "It must have an media" });
        }

        if (file.size > 10000000) {  // 10MB
            return res.status(400).json({ message: "Media should be less than 10 MB" });
        }

        const result = await uploadFile(file);
        await unlink(file.path);
        return res.status(200).json({result});
    } catch (e) {
        console.log("error----->", e);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteImg = async (req: Request, res: Response) => {
    try {
        const isDelete = await deleteFile(req.body.key);
        return res.status(200).json({
            isdelete: isDelete
        });
    } catch (e) {
        console.log("error----->", e);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export async function uploadPDF(file: string, filename: string, res: Response): Promise<any> {
    try {
        console.log("path--->", file);
        // creating fileStream
        const fileStream = fs.createReadStream(file);

        // creating uploading param
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: filename,
            ContentType: 'application/pdf',
        };
        const result = await s3.upload(uploadParams).promise();
        return res.json({
            pdfLink: result
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}



export const uploadPdftoWhatsapp = async (pdfLink: string) => {
    try {
        const fileContent = fs.readFileSync(pdfLink);
        const params = {
            Bucket: bucketName,
            Key: `INVOICE.pdf`,
            Body: fileContent,
            ContentType: 'application/pdf',
        };
        return s3.upload(params).promise();
    } catch (e) {
        console.log("error----->", e);
        return "Internal server error";
    }
};