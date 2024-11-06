// express-multer.d.ts
import { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      files?: Multer.File[]; 
    }
  }
}
