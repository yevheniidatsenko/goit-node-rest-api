import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

// Returns an array of contacts
export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

// Returns a contact object with the given id. Returns null if no contact with such id is found
export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result || null;
  } catch (error) {
    throw error;
  }
}

// Returns the deleted contact object. Returns null if no contact with such id is found
export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) return null;

    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    throw error;
  }
}

// Returns the added contact object (with id)
export async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

// Returns the updated contact object. Returns null if no contact with such id is found
export async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
