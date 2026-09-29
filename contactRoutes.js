const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /api/contacts
// Create a new contact
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();

        res.status(201).json({
            message: 'Contact created successfully',
            contact: savedContact
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to create contact',
            error: error.message
        });
    }
});


// GET /api/contacts
// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch contacts',
            error: error.message
        });
    }
});


// GET /api/contacts/:id
// Get contact by MongoDB ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid contact ID',
            error: error.message
        });
    }
});


// PUT /api/contacts/:id
// Update contact
router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedContact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            message: 'Contact updated successfully',
            contact: updatedContact
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update contact',
            error: error.message
        });
    }
});


// DELETE /api/contacts/:id
// Delete contact
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(
            req.params.id
        );

        if (!deletedContact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.status(200).json({
            message: 'Contact deleted successfully',
            contact: deletedContact
        });
    } catch (error) {
        res.status(400).json({
            message: 'Invalid contact ID',
            error: error.message
        });
    }
});

module.exports = router;