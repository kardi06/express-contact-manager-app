const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require('mongoose');

//@desc Get All Contact
//@route GET /api/contacts
//@access private

const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id : req.user.id});
  res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  // console.log("The request body : ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  // Validasi ID sebelum melakukan query
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid contact Id");
  }

  const contacts = await Contact.findById(req.params.id);
  if(!contacts){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contacts);
});

//@desc Update Single Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid contact Id");
  }

  const contacts = await Contact.findById(req.params.id);
  if(!contacts){
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contacts.user_id.toString() !== req.user.id){
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

//@desc Delete Single Contact
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid contact Id");
  }

  const contacts = await Contact.findById(req.params.id);
  if(!contacts){
    res.status(404);
    throw new Error("Contact not found");
  }
  
  if(contacts.user_id.toString() !== req.user.id){
    res.status(401);
    throw new Error("User not authorized");
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contacts);
});

module.exports = {
  getAllContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
