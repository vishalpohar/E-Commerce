import dotenv from "dotenv";

dotenv.config();

const envars = {
  mongo_uri: process.env.MONGO_URI,
  mongo_port: process.env.PORT,

  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

  upstash_redis_url: process.env.UPSTASH_REDIS_URL,

  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};

export default envars;
