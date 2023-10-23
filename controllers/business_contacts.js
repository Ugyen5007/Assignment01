
// create a reference to the model
let ContactModel = require('../models/business_contacts');

// Gets all business contacts from the Database and renders the page to list them all.
module.exports.businessContactList = async function(req, res, next) {  

    try {
        let contactList = await ContactModel.find({});

        res.render('business/list', {
            title: 'Business Contacts List', 
            ContactList: contactList,
            userName: req.user ? req.user.username : ''
        })  
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    
    let blankContact = ContactModel();

    res.render('business/add_edit',
        {
            title: 'Add a new Contact',
            contact: blankContact,
            userName: req.user ? req.user.username : ''
        });       

}

// Processes the data submitted from the Add form to create a new contact
module.exports.processAddPage = async (req, res, next) => {

    
    try {

        let newContact = ContactModel({
            _id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        });

        let result = await ContactModel.create(newContact)

        // refresh the business contacts list
        console.log(result);
        res.redirect('/business/list');

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Gets a contact by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async (req, res, next) => {
    
    
    try {
        let id = req.params.id;

        let contactToEdit = await ContactModel.findById(id);

        res.render('business/add_edit',
            {
                title: 'Edit a new Contact',
                contact: contactToEdit,
                userName: req.user ? req.user.username : ''
            });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// Processes the data submitted from the Edit form to update a business contact
module.exports.processEditPage = async (req, res, next) => {
    
    
    try {

        let id = req.params.id

        // Builds updatedContact from the values of the body of the request.
        let updatedContact = ContactModel({
            _id: req.body.id,
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        });

        // Submits updatedContact to the DB and waits for a result.
        let result = await ContactModel.updateOne({ _id: id }, updatedContact);
        console.log(result);

        // If the business contact is updated redirects to the list
        if (result.modifiedCount > 0) {
            res.redirect('/business/list');
        }
        else {
            // Express will catch this on its own.
            throw new Error('Contact not updated. Are you sure it exists?') 
        }

    } catch (error) {
        next(error)
    }
}

// Deletes a contact based on its id.
module.exports.performDelete = async (req, res, next) => {
    
    
    try {

        let id = req.params.id;

        let result = await ContactModel.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the contact list
            res.redirect('/business/list');
        }
        else {
            // Express will catch this on its own.
            throw new Error('Contact not deleted. Are you sure it exists?') 
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

}