import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);
  if (!data) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(data);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsService.removeContact(id);
  if (!deletedContact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(deletedContact);
};

const createContact = async (req, res) => {
  const { error } = validateBody(req.body, createContactSchema);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { error } = validateBody(req.body, updateContactSchema);
  if (error) {
    throw HttpError(400, error.message);
  }
  const data = await contactsService.updateContact(id, req.body);
  if (!data) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(data);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
