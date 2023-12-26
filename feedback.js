```javascript
const database = require('./database.js'); // Assuming you have a separate file for database related functions

class Feedback {
    constructor() {
        this.feedbackCollection = 'feedback'; // Assuming 'feedback' is the collection name in your database
    }

    async addFeedback(feedback) {
        // Connect to the database
        await database.connect();

        // Add the feedback to the 'feedback' collection
        const result = await database.db.collection(this.feedbackCollection).insertOne(feedback);

        // Disconnect from the database
        await database.disconnect();

        return result;
    }

    async getFeedback() {
        // Connect to the database
        await database.connect();

        // Get all feedback from the 'feedback' collection
        const feedbacks = await database.db.collection(this.feedbackCollection).find().toArray();

        // Disconnect from the database
        await database.disconnect();

        return feedbacks;
    }

    async updateFeedback(feedbackId, updatedFeedback) {
        // Connect to the database
        await database.connect();

        // Update the feedback with the given id in the 'feedback' collection
        const result = await database.db.collection(this.feedbackCollection).updateOne({ _id: feedbackId }, { $set: updatedFeedback });

        // Disconnect from the database
        await database.disconnect();

        return result;
    }

    async deleteFeedback(feedbackId) {
        // Connect to the database
        await database.connect();

        // Delete the feedback with the given id from the 'feedback' collection
        const result = await database.db.collection(this.feedbackCollection).deleteOne({ _id: feedbackId });

        // Disconnect from the database
        await database.disconnect();

        return result;
    }
}

module.exports = new Feedback();
```
