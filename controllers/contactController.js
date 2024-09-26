//@desc Get All Contact
//@route GET /api/contacts
//@access public

const getAllContact = (req, res) => {
    res.status(200).json({message: "Get all contact"});
}


//@desc Create New Contact
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
    console.log("The request body : ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields required");
    }
    res.status(201).json({message: "Create Contact"});
}

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
    res.status(200).json({message: `Get contact for ${req.params.id}`});
}


//@desc Update Single Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({message: `Update contact for ${req.params.id}`});
}

//@desc Delete Single Contact
//@route Delete /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({message: `Delete contact for ${req.params.id}`});
}

module.exports = {getAllContact, createContact, getContact, updateContact, deleteContact}