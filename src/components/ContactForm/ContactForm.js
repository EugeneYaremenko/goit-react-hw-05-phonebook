import React, { Component } from 'react';
import styles from './contactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;

    e.preventDefault();

    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={this.handleNameChange}
          ></input>
        </label>

        <label>
          Number
          <input
            type="number"
            value={number}
            onChange={this.handleNumberChange}
          ></input>
        </label>
        <button type="submit" className={styles.addButton}>
          Add contact
        </button>
      </form>
    );
  }
}
