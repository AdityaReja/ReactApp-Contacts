import React from 'react';
import * as ContactsApi from './utils/ContactsAPI';
import './App.css';
import ContactList from './Contacts';
import CreateContacts from './CreateContacts';
import { Route } from 'react-router-dom';

class App extends React.Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsApi.getAll().then((contacts) => {
      this.setState(() => ({
        contacts: contacts
      }))
    })
  }

  createContact(contact) {
    ContactsApi.create(contact).then((contact) => {
      console.log('contact',contact);
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact])
      }))
    })
  }
  removeContact = (contact) => {
    console.log('contact',contact);
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }));
    ContactsApi.remove(contact);
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={() => ((
          <ContactList
            contacts={this.state.contacts}
            deleteContact={this.removeContact}>
          </ContactList>
        ))}></Route>
        <Route path='/create' render={({history}) => ((
          <CreateContacts
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}></CreateContacts>
        ))}></Route>
      </div>
    );
  }
}

export default App;
