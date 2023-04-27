import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import ContactsForm from '../ContactsForm/ContactsForm';
import Filter from '../Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const con = localStorage.getItem('contacts');
    const conParsed = JSON.parse(con);

    if (!conParsed) {
      return;
    }
    setContacts(conParsed);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) return;

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(contacts.filter(con => con.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const formSubmit = (name, number) => {
    console.log(name, number);
    const checkAlert = contacts.some(
      f => f.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (checkAlert) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(9),
      name: name,
      number: number,
    };

    setContacts([newContact, ...contacts]);
  };

  const normalizeFilter = filter.toLocaleLowerCase();
  const filterContacts = contacts.filter(fil => {
    console.log(fil);
    return fil.name.toLocaleLowerCase().includes(normalizeFilter);
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm onSubmit={formSubmit} />

      <h2>Contacts</h2>
      <Filter val={filter} onChange={changeFilter} />
      <ContactsList data={filterContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
