import { Readable } from "stream";
import cloudinary from "../config/cloudinary";

interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
}

const uploadImage = async (
    buffer: Buffer
): Promise<CloudinaryUploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "aniket-portfolio/projects",
                resource_type: "image",
            },
            (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Image upload failed"));
                }

                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
};

export default uploadImage;