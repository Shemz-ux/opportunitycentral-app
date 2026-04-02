const { sendContactEmail } = require('../services/email');

let db;

const setDb = (database) => {
    db = database;
};

const submitContactForm = async (req, res) => {
    const { name, email, organisation, enquiryType, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({ message: 'Name, email, and message are required!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: 'Invalid email format!' });
    }

    try {
        // Add to mailing list if not already subscribed
        const mailingListCollection = db.collection('mailingList');
        const existingSubscriber = await mailingListCollection.findOne({ email });

        if (!existingSubscriber) {
            await mailingListCollection.insertOne({
                email,
                subscribedAt: new Date(),
                isActive: true,
                source: 'contact_form'
            });
        }

        // Send email to admin
        await sendContactEmail(name, email, organisation, enquiryType, message);

        console.log(`✅ Contact form processed: ${name} <${email}>`);

        res.status(201).send({ 
            message: '✅ Thank you for contacting us! We will get back to you soon.'
        });

    } catch (err) {
        console.error('❌ CONTACT FORM ERROR:', err);
        res.status(500).send({ 
            message: '❌ Failed to submit contact form. Please try again.' 
        });
    }
};

module.exports = { submitContactForm, setDb };