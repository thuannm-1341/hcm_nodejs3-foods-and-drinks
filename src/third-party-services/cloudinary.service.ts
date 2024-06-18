import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  imageBuffer: Buffer,
  publicId: string,
): Promise<string> => {
  try {
    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ public_id: publicId }, (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result as UploadApiResponse);
          })
          .end(imageBuffer);
      },
    );
    return uploadResult.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
