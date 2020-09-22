const fs = require('fs').promises;
const path = require('path');
const { number } = require('yargs');
const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

module.exports.listContacts = async function () {
  const contacts = await fs
    .readFile(contactsPath, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data));
  console.table(contacts);
};

module.exports.getContactById = async function (contactId) {
  try {
    const contacts = await fs
      .readFile(contactsPath, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data));
    const findedContact = contacts.find((contact) => contact.id === contactId);
    console.table(findedContact);

    return findedContact;
  } catch (error) {
    console.log('error', error);
  }
};

module.exports.removeContact = async function (contactId) {
  const contacts = await fs
    .readFile(contactsPath, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data));
  const filteredList = contacts.filter((contact) => contact.id !== contactId);
  const FilteredListAsJSON = JSON.stringify(filteredList);
  console.table(filteredList);
  fs.writeFile(contactsPath, FilteredListAsJSON, (err) => {
    if (err) throw err;

    return err;

  });
};

module.exports.addContact = async function (name, email, phone) {
  const contacts = await fs
    .readFile(contactsPath, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data));
  const lastElement = contacts.pop();
  contacts.push(lastElement);
  const id = lastElement.id + 1;

  const newContact = {
    id: id,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  contacts.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  const newContactListAsJSON = JSON.stringify(contacts);
  fs.writeFile(contactsPath, newContactListAsJSON);
  console.table(contacts);
};

module.exports.update = async function (contact) {
  const contacts = await fs
    .readFile(contactsPath, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data));
  contacts.push(contact);
  contacts.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  const newContactListAsJSON = JSON.stringify(contacts);
  fs.writeFile(contactsPath, newContactListAsJSON);
};
