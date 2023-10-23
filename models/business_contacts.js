
// Import mongoose
let mongoose = require('mongoose');

// Create a model class
let contactModel = mongoose.Schema(
    {
        name: String,
        number: String,
        email: String            
    },
    {
        collection: "business_contacts"
    }
);

module.exports = mongoose.model("BusinessContact", contactModel);