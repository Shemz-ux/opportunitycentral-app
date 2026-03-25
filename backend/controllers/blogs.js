let db;

const setDb = (database) => {
    db = database;
};

const createBlog = (req, res) => {
    const blog = req.body;
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

const getBlogs = (req, res) => {
    const collection = db.collection('blogs');
    const { category } = req.query;

    const filter = category && category != 'All' ? { category: category } : {};

    collection.find(filter).toArray()
        .then(blogs => {
            res.status(200).send({blogs})
        })
        .catch(err => {
            res.status(500).send('Error occurred while fetching blogs!')
        })
}
// TODOD: get jobs by category, get jobs by slug, get jobs by objectId, delete, update

module.exports = { createBlog, getBlogs, setDb };
