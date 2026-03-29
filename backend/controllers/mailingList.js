const { ObjectId } = require("mongodb");

let db;

const setDb = (database) => {
    db = database;
};

const createMailingListEntry = (req, res) => {
    const { email} = req.body;
    
    if (!email) {
        return res.status(400).send({ message: '⚠️ Email is required!' });
    }

    const entry = {
        email,
        subscribedAt: new Date(),
        isActive: true
    };

    const collection = db.collection('mailingList');

    // Check if email already exists
    collection.findOne({ email })
        .then(existingEntry => {
            if (existingEntry) {
                return res.status(409).send({ message: '⚠️ Email already subscribed!' });
            }

            return collection.insertOne(entry)
                .then(result => {
                    res.status(201).send({ 
                        message: '✅ Successfully subscribed to mailing list!',
                        entry: { email }
                    });
                });
        })
        .catch(err => {
            console.error('❌ CREATE MAILING LIST ERROR:', err);
            res.status(500).send({ message: '❌ CREATE MAILING LIST ERROR', error: err });
        });
};

const deleteMailingListEntry = (req, res) => {
    const collection = db.collection('mailingList');
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        console.warn(`⚠️ Invalid mailing list entry ID: ${id}`);
        return res.status(400).send({ message: `⚠️ Invalid entry ID format: ${id}` });
    }

    collection.deleteOne({ _id: new ObjectId(id) })
        .then(result => {
            if (result.deletedCount === 0) {
                console.warn(`⚠️ Mailing list entry not found: ${id}`);
                return res.status(404).send({ message: '⚠️ Entry not found!' });
            } else {
                console.log(`✅ Successfully deleted mailing list subscriber: ${id}`);
                res.status(200).send({ message: `✅ Subscriber ${id} deleted successfully!` });
            }
        })
        .catch(err => {
            console.error('❌ DELETE MAILING LIST ERROR:', err);
            res.status(500).send('❌ Error occurred while deleting entry!');
        });
};

const getMailingList = (req, res) => {
    const collection = db.collection('mailingList');
    const { isActive } = req.query;

    let filter = {};
    
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }

    collection.find(filter).sort({ subscribedAt: -1 }).toArray()
        .then(entries => {
            res.status(200).send({ entries, count: entries.length });
        })
        .catch(err => {
            res.status(500).send({ message: '❌ GET MAILING LIST ERROR', error: err });
        });
};

module.exports = { createMailingListEntry, deleteMailingListEntry, getMailingList, setDb };