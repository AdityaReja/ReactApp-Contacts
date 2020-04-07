import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class ContactList extends Component {
    state = {
        query: ''
    }
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        deleteContact: PropTypes.func.isRequired
    }
    updateQuerry = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateQuerry('')
    }
    render() {
        const { query } = this.state
        const { contacts, deleteContact } = this.props
        let showContacts = query === ''
            ? contacts
            : contacts.filter((c) => (
                c.name.toLowerCase().includes(query.toLowerCase())
            ))
        return (
            <div className="list-contacts">
                <div className='list-contacts-top'>
                    <input
                        type='text'
                        className='search-contacts'
                        placeholder='Search-Contacts'
                        value={query}
                        onChange={(event) => this.updateQuerry(event.target.value)}
                    />
                    <Link
                        to='/create'
                        className='add-contact'>
                        Add Contacts
                    </Link>
                </div>
                {showContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>
                            Now showing {showContacts.length} of {contacts.length}
                        </span>
                        <button onClick={() => this.clearQuery()}>Show All</button>
                    </div>
                )}
                <ol className="contact-list">
                    {showContacts.map((person) => (
                        <li key={person.id} className='contact-list-item'>
                            <div className='contact-avatar'
                                style={{
                                    backgroundImage: `url(${person.avatarURL})`
                                }}>
                            </div>
                            <div className='contact-details'>
                                <p>{person.name}</p>
                                <p>{person.handle}</p>
                            </div>
                            <button
                                onClick={() => deleteContact(person)}
                                className='contact-remove'>
                                remove
                        </button>
                        </li>
                    ))}
                </ol>
            </div>

        )
    }
}

export default ContactList;
