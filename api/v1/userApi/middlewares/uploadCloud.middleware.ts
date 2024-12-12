import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../../../helpers/uploadToCloudinary";

interface MulterRequest extends Request {
    file?: any;
    files?: any;
}

export const uploadSingle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //Hàm Upload lên cloudinary
    const file = (req as MulterRequest).file
    if (file) {
      const link = await uploadToCloudinary(file.buffer, file.mimetype);
      req.body[file.fieldname] = link; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
    }
  
    next();
  };
  
  export const uploadFields = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Hàm Upload lên cloudinary
    const files = (req as MulterRequest).file
      for (const key in files) {
        const array = files[key]
        for (const item of array) {
          try {
            let file: any = item;
            const result = await uploadToCloudinary(file.buffer, file.mimetype);
            const field: string = file.mimetype === 'image/jpeg' ? 'avatar' : 'audio'
            req.body[field] = result; //req.file.fieldname để linh động thay cho req.body.thumbnail vì khi upload có thể là thumbnail hoặc image
          } catch (error) {
            console.log(error);
          }
        }
      }
    next();
  };  