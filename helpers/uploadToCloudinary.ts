import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import * as fs from 'fs';
dotenv.config();

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
//End Cloudinary

let streamUpload = (buffer: any, mimetype: string) => {
  return new Promise((resolve, reject) => {
    // Xác định resource_type dựa vào mimetype
    let resourceType: 'image' | 'video' | 'raw' | 'auto' = 'image';

    if (mimetype.startsWith('audio/') || mimetype.startsWith('video/')) {
      resourceType = 'video'; // Nếu là âm thanh hoặc video
    }

    let stream = cloudinary.uploader.upload_stream({
      resource_type: resourceType
    },(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    fs.createReadStream(buffer).pipe(stream as any);
  });
};

export const uploadToCloudinary = async (buffer: any, mimetype: string) => {
  let result: any = await streamUpload(buffer, mimetype);
  return result.secure_url;
}; //Tạo một trường req.file.fieldname trong req.body có giá trị result.secure_url để trong controller luu vào database