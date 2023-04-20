import { ContactForm } from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const isContactInBook = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactInBook) {
      return Notiflix.Notify.failure(`${name} is already in contacts`);
    }

    const contactId = nanoid();

    const contact = {
      name,
      number,
      id: contactId,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleFilterContacts = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  };

  handelDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normilizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normilizedFilter);
    });
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter
          nameForFind={this.state.filter}
          onFilter={this.handleFilterContacts}
        />
        <h2>Contact List </h2>
        <ContactList
          contacts={visibleContacts}
          deleteFn={this.handelDeleteContact}
        />
      </div>
    );
  }
}
