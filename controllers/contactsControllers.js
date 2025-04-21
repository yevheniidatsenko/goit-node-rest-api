import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

//  Get all user contacts

export const getContactsController = ctrlWrapper(async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.getContacts({ owner });
  res.json(data);
});

//Get contact by id if it belongs to the user

export const getContactByIdController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.getContact({ id, owner });
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(data);
});

// Add a new contact for the user

export const addContactController = ctrlWrapper(async (req, res) => {
  const { id: owner } = req.user;
  // Validation of req.body can be added here before calling the service
  const data = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(data);
});

// Update contact by id if it belongs to the user

export const updateContactController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  // Validation of req.body is recommended
  const data = await contactsService.updateContact({ id, owner }, req.body);
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(data);
});

// Delete contact by id if it belongs to the user

export const deleteContactController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.deleteContact({ id, owner });

  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  // Response with no body and status code 204
  res.status(204).send();
});

// Update the "favorite" status of a contact

export const updateStatusContactController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  // Validation of req.body (e.g., ensuring the "favorite" field exists) is recommended
  const data = await contactsService.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(data);
});
