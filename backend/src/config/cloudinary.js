

// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Validate configuration
// const validateCloudinaryConfig = () => {
//   if (
//     !process.env.CLOUDINARY_CLOUD_NAME ||
//     !process.env.CLOUDINARY_API_KEY ||
//     !process.env.CLOUDINARY_API_SECRET
//   ) {
//     throw new Error(
//       'Cloudinary configuration is missing. Please check your .env file.'
//     );
//   }
// };

// validateCloudinaryConfig();

// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

