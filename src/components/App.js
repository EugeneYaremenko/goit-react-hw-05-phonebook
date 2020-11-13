import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import Wrapper from './Wrapper/Wrapper';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import filterFade from '../components/Filter/fade.module.css';
import ErrorNotification from './Notification/ErrorNotification';
import errorFade from '../components/Notification/fade.module.css';
import fade from '../components/ContactList/fade.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    dobleName: false,
  };

  componentDidMount() {
    const notEmptyContacts = localStorage.getItem('contacts');

    if (notEmptyContacts) {
      this.setState({ contacts: JSON.parse(notEmptyContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleAddContact = (text, number) => {
    const { contacts } = this.state;
    const dobleName = contacts.find(
      cont => cont.name.toLowerCase() === text.toLowerCase(),
    );

    const contact = {
      id: uuidv4(),
      name: text,
      number: number,
    };

    if (dobleName) {
      this.setState({ dobleName: text });
      setTimeout(() => this.setState({ dobleName: false }), 2000);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  handleVisibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleRemoveContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId,
        ),
      };
    });
  };

  render() {
    const { contacts, filter, dobleName } = this.state;
    const visibleContact = this.handleVisibleContact();

    return (
      <Wrapper>
        <CSSTransition
          in={dobleName}
          timeout={2500}
          classNames={errorFade}
          unmountOnExit
        >
          <ErrorNotification name={dobleName} />
        </CSSTransition>

        <Section title="Phonebook">
          <ContactForm onAddContact={this.handleAddContact} unmountOnExit />
        </Section>

        <Section title="Contacts">
          <CSSTransition
            in={contacts.length > 1}
            timeout={250}
            classNames={filterFade}
            unmountOnExit
          >
            <Filter
              title="Find contacts by name"
              value={filter}
              onChangeFilter={this.handleChangeFilter}
            />
          </CSSTransition>
        </Section>
        <CSSTransition
          in={visibleContact.length > 0}
          timeout={250}
          classNames={fade}
        >
          <ContactList
            contacts={visibleContact}
            onRemoveContact={this.handleRemoveContact}
          />
        </CSSTransition>
      </Wrapper>
    );
  }
}
