const fs = require('fs').promises;
const path = require('path');
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
  const newContactListAsJSON = JSON.stringify(contacts);
  fs.writeFile(contactsPath, newContactListAsJSON);
  console.table(contacts);
};

// getContactById(2);
// removeContact(2);
// addContact('asdasd', 'asdasdad', '2323232');
