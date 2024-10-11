import fs from 'fs'; // Import for asynchronous file reading
import { S3 } from 'aws-sdk';

// Load environment variables with type safety
export const bucketName = process.env.AWS_BUCKET_NAME as string;
export const region = process.env.AWS_BUCKET_REGION as string;
export const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY as string;
export const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY as string;

// Configure S3 client
export const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Improved uploadFile function
export async function uploadFile(file: any): Promise<any> {
  try {
    // creating fileStream
    const fileStream = fs.createReadStream(file.path);

    // creating uploading param
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename + '.' + file.mimetype.split('/')[1],
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
    const result = await s3.upload(uploadParams).promise();
    return result ;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

export async function deleteFile(key: any): Promise<boolean> {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };
    await s3.deleteObject(deleteParams).promise();
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}


