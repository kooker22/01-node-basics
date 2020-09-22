const { Router } = require('express');
const contacts = require('../../contacts');

const contactsRouter = Router();

contactsRouter.get('/api/contacts', async (req, res) => {
  const gettedContacts = await contacts.listContacts();
  res.json(gettedContacts);
});
contactsRouter.get('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const foundedContact = await contacts.getContactById(Number(contactId));
  if (foundedContact) {
    res.status(200).json(foundedContact);
  }
  res.status(404).send({ message: 'not found' });
});

contactsRouter.post('/api/contacts', async (req, res) => {
  const { name, email, phone } = req.body;
  if (
    typeof name === 'string' &&
    typeof email === 'string' &&
    typeof phone === 'string' &&
    name.length > 0 &&
    email.length > 8 &&
    phone.length > 8
  ) {
    const newContact = await contacts.addContact(name, email, phone);

    res.status(201).json(newContact);
    return;
  }
  res.status(400).send({ message: 'missing required name field' });
});

contactsRouter.delete('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await contacts.getContactById(Number(contactId));
  if (contactToDelete) {
    contacts.removeContact(Number(contactId));
    res.status(200).json({ message: 'contact deleted' });
  }
  res.status(404).send({ message: 'Not found' });
});
contactsRouter.patch('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  console.log(contactId);

  if (
    typeof name === 'string' &&
    typeof email === 'string' &&
    typeof phone === 'string' &&
    name.length > 0 &&
    email.length > 8 &&
    phone.length > 8
  ) {
    let contactToPatch = await contacts.getContactById(Number(contactId));
    if(contactToPatch) {
      contactToPatch = {
        id: Number(contactId),
        name: name,
        email: email,
        phone: phone,
      };
  
      await contacts.removeContact(Number(contactId));
      await contacts.update(contactToPatch);
      res.status(200).json(contactToPatch);
    }
  
  }
  res.status(404).send({ message: 'Not found' });
});
module.exports = contactsRouter;
