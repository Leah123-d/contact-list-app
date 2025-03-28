import express from 'express';
import{
  getContact,
  getContacts,
  getstarsign,
  createContact,
  updateContact,
  deleteContact,
  searchContacts,
  getHoroscope,
} from '../controllers/contactsConroller.js';

const router = express.Router();

router.get("/search/:name",searchContacts)
router.get("/birthday/:birthday", getstarsign); //join function to the starsign table
router.get("/:contact_id", getContact);
router.get("/", getContacts);
router.post("/", createContact);
router.put("/:contact_id", updateContact);
router.delete("/:contact_id", deleteContact);

export default router;