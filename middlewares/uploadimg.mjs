import multer from "multer";
import cloudinary from "../config/cloudinary.mjs"
import pkg from "multer-storage-cloudinary";

const { CloudinaryStorage } = pkg; 


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "products",
        allowedFormats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
})

const upload = multer({ storage});

export default upload;