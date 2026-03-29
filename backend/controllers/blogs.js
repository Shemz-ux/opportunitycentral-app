const { ObjectId } = require("mongodb");

let db;

const setDb = (database) => {
    db = database;
};

const createBlog = (req, res) => {
    const blog = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const collection = db.collection('blogs');

    collection.insertOne(blog)
        .then(result => {
            console.log(`✅Successfully created blog: ${result.insertedId}`)
            res.status(201).send({newBlog: blog});
        })
        .catch(err => {
            res.status(500).send('Error occurred could not created blog!');
        });
};

const deleteBlog = (req, res) => {
    const collection = db.collection('blogs');
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({message: 'Invalid blog ID!'});
    }

    collection.deleteOne({ _id: new ObjectId(id) })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send({message: 'Blog not found!'});
            } else {
                console.log(`✅Successfully deleted blog: ${id}`);
                res.status(200).send({message: `✅Blog ${id} deleted successfully!`});
            }
        })
        .catch(err => {
            console.error('Error occurred while deleting blog:', err);
            res.status(500).send('❌Error occurred while deleting blog!');
        })
}

const updateBlog = (req, res) => {
    const collection = db.collection('blogs');
    const { id } = req.params;
    const updates = req.body;

    if (!ObjectId.isValid(id)) {
        console.warn(`⚠️ Invalid blog ID format: ${id}`);
        return res.status(400).send({message: `⚠️ Invalid blog ID format: ${id}`});
    }

    delete updates._id;

    if (Object.keys(updates).length === 0) {
        console.warn('⚠️ No fields to update!');
        return res.status(400).send({message: '⚠️ No fields to update!'});
    }

    updates.updatedAt = new Date();

    collection.updateOne({ _id: new ObjectId(id) }, { $set: updates })
        .then(result => {
            if (result.matchedCount === 0) {
                console.warn(`⚠️ Blog not found: ${id}`);
                return res.status(404).send({message: `⚠️ Blog not found: ${id}`});
            } else {
                console.log(`✅Successfully updated blog: ${id}`);
                res.status(200).send({message: `✅Blog ${id} updated successfully!`});
            }
        })
        .catch(err => {
            res.status(500).send('Error occurred while updating blog!');
        })
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

const incrementView = (req, res) => {
    const collection = db.collection('blogs');
    const { id } = req.params;
    collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).send({message: 'Blog not found!'});
            } else {
                res.status(200)
            }
        })
        .catch(err => {
            res.status(500).send('Error occurred while incrementing blog views!');
        })
}

module.exports = { createBlog, deleteBlog, updateBlog, getBlogs, getBlogBySlug, incrementView, setDb };
