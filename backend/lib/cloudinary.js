import { v2 as cloudinary } from "cloudinary";
import envars from "./enVars.js";

cloudinary.config({
  cloud_name: envars.cloudinary_cloud_name,
  api_key: envars.cloudinary_api_key,
  api_secret: envars.cloudinary_api_secret,
});

export default cloudinary;
