const { ObjectId } = require("mongodb");
const { 
    uploadBlogImage, 
    deleteImageFromCloudinary, 
    replaceImageInCloudinary, 
    extractPublicIdFromUrl,
    validateImageType 
} = require("../services/mediaUpload");

let db;

const setDb = (database) => {
    db = database;
};

const createBlog = async (req, res) => {
    try {
        const { image, ...blogData } = req.body;

        if (!image) {
            return res.status(400).send({ message: 'Image is required' });
        }

        if (!validateImageType(image)) {
            return res.status(400).send({ message: 'Invalid image format' });
        }

        const uploadResult = await uploadBlogImage(image);

        const blog = {
            ...blogData,
            image: uploadResult.url,
            imagePublicId: uploadResult.publicId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const collection = db.collection('blogs');
        const result = await collection.insertOne(blog);

        console.log(`✅ Successfully created blog: ${result.insertedId}`);
        res.status(201).send({ newBlog: blog });
    } catch (err) {
        console.error('❌ Error creating blog:', err);
        res.status(500).send({ message: 'Error occurred could not create blog!' });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const collection = db.collection('blogs');
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid blog ID!' });
        }

        const blog = await collection.findOne({ _id: new ObjectId(id) });

        if (!blog) {
            return res.status(404).send({ message: 'Blog not found!' });
        }

        if (blog.imagePublicId) {
            try {
                await deleteImageFromCloudinary(blog.imagePublicId);
            } catch (imageError) {
                console.warn('⚠️ Failed to delete image from Cloudinary, continuing with blog deletion');
            }
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        console.log(`✅ Successfully deleted blog: ${id}`);
        res.status(200).send({ message: `✅ Blog ${id} deleted successfully!` });
    } catch (err) {
        console.error('❌ Error occurred while deleting blog:', err);
        res.status(500).send({ message: '❌ Error occurred while deleting blog!' });
    }
}

const updateBlog = async (req, res) => {
    try {
        const collection = db.collection('blogs');
        const { id } = req.params;
        const updates = req.body;

        if (!ObjectId.isValid(id)) {
            console.warn(`⚠️ Invalid blog ID format: ${id}`);
            return res.status(400).send({ message: `⚠️ Invalid blog ID format: ${id}` });
        }

        delete updates._id;

        if (Object.keys(updates).length === 0) {
            console.warn('⚠️ No fields to update!');
            return res.status(400).send({ message: '⚠️ No fields to update!' });
        }

        const existingBlog = await collection.findOne({ _id: new ObjectId(id) });

        if (!existingBlog) {
            console.warn(`⚠️ Blog not found: ${id}`);
            return res.status(404).send({ message: `⚠️ Blog not found: ${id}` });
        }

        if (updates.image && updates.image.startsWith('data:image')) {
            if (!validateImageType(updates.image)) {
                return res.status(400).send({ message: 'Invalid image format' });
            }

            const oldPublicId = existingBlog.imagePublicId;
            const uploadResult = await replaceImageInCloudinary(oldPublicId, updates.image);

            updates.image = uploadResult.url;
            updates.imagePublicId = uploadResult.publicId;
        }

        updates.updatedAt = new Date();

        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: updates }
        );

        console.log(`✅ Successfully updated blog: ${id}`);
        res.status(200).send({ message: `✅ Blog ${id} updated successfully!` });
    } catch (err) {
        console.error('❌ Error updating blog:', err);
        res.status(500).send({ message: 'Error occurred while updating blog!' });
    }
}

const getBlogs = (req, res) => {
    const collection = db.collection('blogs');
    const { category, isActive, sortBy } = req.query;
    
    let filter = {};

    if (category && category !== 'All') {
        filter.category = category;
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }

    let sort = {};

    if (sortBy === 'latest') {
        sort.createdAt = -1;
    } else if (sortBy === 'oldest') {
        sort.createdAt = 1;
    } else {
        sort.createdAt = -1;
    }


    collection.find(filter).sort(sort).toArray()
        .then(blogs => {
            res.status(200).send({blogs})
        })
        .catch(err => {
            res.status(500).send('Error occurred while fetching blogs!')
        })
}

const getBlogBySlug = (req, res) => {
    const collection = db.collection('blogs');
    const { slug } = req.params;
    collection.findOne({ slug })
        .then(blog => {
            res.status(200).send({blog})
        })
        .catch(err => {
            res.status(500).send('Error occurred while fetching blog!')
        })
}

const getCategories = (req, res) => {
    const collection = db.collection('blogs');
    collection.distinct('category', {})
        .then(categories => {
            res.status(200).send({categories})
        })
        .catch(err => {
            res.status(500).send('Error occurred while fetching categories!')
        })
}

const incrementView = (req, res) => {
    const collection = db.collection('blogs');
    const { id } = req.params;
    collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).send({message: 'Blog not found!'});
            } else {
                res.status(200).send({message: '✅ Blog views incremented successfully!'});
            }
        })
        .catch(err => {
            res.status(500).send('Error occurred while incrementing blog views!');
        })
}

module.exports = { createBlog, deleteBlog, updateBlog, getBlogs, getCategories, getBlogBySlug, incrementView, setDb };
