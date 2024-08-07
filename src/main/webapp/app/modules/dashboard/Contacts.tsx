import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'reactstrap';
import './Contact1.scss'; // Import the updated CSS file

interface Contact {
  id: number;
  contact_Name: string;
  account_Name: string;
  email: string;
  phone: string;
  contact_Owner: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContacts(response.data);
      } catch (err) {
        setError('Error fetching contacts data');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      {contacts.length > 0 ? (
        <div className="table-responsive">
          <Table striped bordered className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Account</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{contact.contact_Name}</td>
                  <td>{contact.account_Name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.contact_Owner}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        !loading && <p>No contacts available.</p>
      )}
    </div>
  );
};

export default Contacts;
