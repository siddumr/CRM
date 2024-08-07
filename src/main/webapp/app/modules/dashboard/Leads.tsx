import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
  Alert,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import './Leads.scss';

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  website: string;
  email: string;
  lead_source: string;
  lead_status: string;
  created_at: string;
  phone?: string; // Add optional fields if needed
  address?: string; // Add optional fields if needed
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState(''); // State for the filter

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('/api/leads');
        setLeads(response.data);
      } catch (err) {
        setError('Error fetching leads data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const toggleModal = (lead: Lead | null) => {
    setSelectedLead(lead);
    setModal(!modal);
  };

  const closeLead = async (id: number) => {
    try {
      await axios.put(`/api/leads/${id}`, { lead_status: 'Closed' });
      const updatedLeads = leads.map(lead => (lead.id === id ? { ...lead, lead_status: 'Closed' } : lead));
      setLeads(updatedLeads);
    } catch (err) {
      setError('Error updating lead');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredLeads = leads.filter(
    lead =>
      lead.first_name?.toLowerCase().includes(filter.toLowerCase()) ||
      lead.last_name?.toLowerCase().includes(filter.toLowerCase()) ||
      lead.company?.toLowerCase().includes(filter.toLowerCase()) ||
      lead.email?.toLowerCase().includes(filter.toLowerCase()) ||
      lead.lead_status?.toLowerCase().includes(filter.toLowerCase()),
  );

  const createLead = () => {
    // Implement lead creation logic here
  };

  return (
    <>
      <h2>Leads</h2>
      <div className="filter-create-container">
        <Input
          type="text"
          placeholder="Filter leads by name, company, email, or status"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <Button color="success" onClick={createLead} className="create-button">
          Create Lead
        </Button>
      </div>
      {loading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      {filteredLeads.length > 0 ? (
        <Row className="lead-list">
          {filteredLeads.map(lead => (
            <Col md="6" lg="4" key={lead.id} className="mb-4">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    {lead.first_name} {lead.last_name}
                  </CardTitle>
                  <CardText>
                    <strong>Company:</strong> {lead.company}
                  </CardText>
                  <CardText>
                    <strong>Website:</strong> {lead.website}
                  </CardText>
                  <CardText>
                    <strong>Email:</strong> {lead.email}
                  </CardText>
                  <Button color="primary" size="sm" onClick={() => toggleModal(lead)}>
                    View More
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        !loading && <p>No leads available.</p>
      )}

      {selectedLead && (
        <Modal isOpen={modal} toggle={() => toggleModal(null)}>
          <ModalHeader toggle={() => toggleModal(null)}>Lead Details</ModalHeader>
          <ModalBody>
            <p>
              <strong>Name:</strong> {selectedLead.first_name} {selectedLead.last_name}
            </p>
            <p>
              <strong>Company:</strong> {selectedLead.company}
            </p>
            <p>
              <strong>Website:</strong> {selectedLead.website}
            </p>
            <p>
              <strong>Email:</strong> {selectedLead.email}
            </p>
            {selectedLead.phone && (
              <p>
                <strong>Phone:</strong> {selectedLead.phone}
              </p>
            )}
            {selectedLead.address && (
              <p>
                <strong>Address:</strong> {selectedLead.address}
              </p>
            )}
            <Button color="danger" onClick={() => closeLead(selectedLead.id)}>
              Close Lead
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggleModal(null)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default Leads;
