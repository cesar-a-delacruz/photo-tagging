import dotenv from "dotenv";
import { cloudinary } from "../utils/file.js";

dotenv.config();

export default {
  upload: async (name, fileBuffer) => {
    let response;
    await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          { folder: process.env.CLOUDINARY_FOLDER, display_name: name },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          },
        )
        .end(fileBuffer);
    })
      .then((result) => {
        console.info(result);
        response = result;
      })
      .catch((error) => {
        console.error(error);
        response = error;
      });
    return response;
  },
  delete: async (url) => {
    let response;
    await new Promise((resolve) => {
      cloudinary.api.delete_resources([
        url.substring(
          url.lastIndexOf(process.env.CLOUDINARY_FOLDER),
          url.lastIndexOf("."),
        ),
      ]);
      resolve();
    }).then((result) => {
      console.log(result);
      response = result;
    });
    return response;
  },
};
