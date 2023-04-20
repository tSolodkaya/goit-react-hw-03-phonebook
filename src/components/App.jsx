import { ContactForm } from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    let parsedContacts;

    try {
      parsedContacts = JSON.parse(contacts);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      } catch (error) {
        console.error('Set state error: ', error.message);
      }
    }
  }

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
