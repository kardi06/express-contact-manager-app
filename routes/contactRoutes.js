const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {getContact,createContact, getAllContact, updateContact, deleteContact} = require("../controllers/contactController");

// router.route("/").get(getAllContact);

// router.route("/").post(createContact);

// router.route("/:id").get(getContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

router.use(validateToken);

router.route("/").get(getAllContact).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;