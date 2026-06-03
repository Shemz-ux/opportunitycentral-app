const cloudinary = require('../config/cloudinary');

const BLOG_FOLDER = 'test-folder';

const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif'];

const uploadBlogImage = async (base64Image) => {
    try {
        if (!base64Image || !base64Image.startsWith('data:image')) {
            throw new Error('Invalid image format. Must be a base64 encoded image.');
        }

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: BLOG_FOLDER,
            allowed_formats: ALLOWED_FORMATS,
            transformation: [
                { width: 900, height: 600, crop: 'fill' }
            ],
            resource_type: 'image'
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height
        };
    } catch (error) {
        console.error('❌ Error uploading image to Cloudinary:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
};

const deleteImageFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error('Public ID is required to delete image');
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok' || result.result === 'not found') {
            console.log(`✅ Image deleted from Cloudinary: ${publicId}`);
            return { success: true, message: 'Image deleted successfully' };
        } else {
            throw new Error(`Deletion failed with result: ${result.result}`);
        }
    } catch (error) {
        console.error('❌ Error deleting image from Cloudinary:', error);
        throw new Error(`Failed to delete image: ${error.message}`);
    }
};

const replaceImageInCloudinary = async (oldPublicId, newBase64Image) => {
    try {
        const uploadResult = await uploadBlogImage(newBase64Image);

        if (oldPublicId) {
            try {
                await deleteImageFromCloudinary(oldPublicId);
            } catch (deleteError) {
                console.warn('⚠️ Failed to delete old image, but new image uploaded successfully');
            }
        }

        return uploadResult;
    } catch (error) {
        console.error('❌ Error replacing image in Cloudinary:', error);
        throw new Error(`Failed to replace image: ${error.message}`);
    }
};

const extractPublicIdFromUrl = (cloudinaryUrl) => {
    try {
        if (!cloudinaryUrl || !cloudinaryUrl.includes('cloudinary.com')) {
            return null;
        }

        const parts = cloudinaryUrl.split('/');
        const uploadIndex = parts.indexOf('upload');
        
        if (uploadIndex === -1) return null;

        const pathAfterUpload = parts.slice(uploadIndex + 1);
        
        const versionIndex = pathAfterUpload.findIndex(part => part.startsWith('v'));
        const relevantParts = versionIndex !== -1 
            ? pathAfterUpload.slice(versionIndex + 1) 
            : pathAfterUpload;

        const publicIdWithExtension = relevantParts.join('/');
        const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));

        return publicId;
    } catch (error) {
        console.error('❌ Error extracting public ID from URL:', error);
        return null;
    }
};

const validateImageType = (base64Image) => {
    const validPrefixes = [
        'data:image/jpeg',
        'data:image/jpg',
        'data:image/png',
        'data:image/gif',
        'data:image/webp',
        'data:image/heic',
        'data:image/heif'
    ];

    return validPrefixes.some(prefix => base64Image.startsWith(prefix));
};

module.exports = {
    uploadBlogImage,
    deleteImageFromCloudinary,
    replaceImageInCloudinary,
    extractPublicIdFromUrl,
    validateImageType
};