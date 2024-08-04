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
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import './dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTasks, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import PieChart from './PieChart';
import LineChart from './LineChart';

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  website: string;
  email: string;
  lead_source: string;
  lead_status: string;
  title?: string;
  fax?: string;
  industry?: string;
  no_of_emp?: number;
  annual_revenue?: string;
  rating?: string;
  social_media?: string;
  media_handle_id?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  description?: string;
  created_at: string;
}

const NewDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
  const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('/api/leads');
        setLeads(response.data);
      } catch (err) {
        setError('Error fetching data');
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

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="new-dashboard-container">
      <div className="new-sidebar">
        <h2>CRM Dashboard</h2>
        <Button className={classnames({ active: activeTab === '1' })} onClick={() => changeTab('1')}>
          <FontAwesomeIcon icon={faChartLine} /> Dashboard
        </Button>
        <Button className={classnames({ active: activeTab === '2' })} onClick={() => changeTab('2')}>
          <FontAwesomeIcon icon={faTasks} /> Leads
        </Button>
        <Button className={classnames({ active: activeTab === '3' })} onClick={() => changeTab('3')}>
          <FontAwesomeIcon icon={faUsers} /> Services
        </Button>
        <Button className={classnames({ active: activeTab === '4' })} onClick={() => changeTab('4')}>
          <FontAwesomeIcon icon={faCog} /> Settings
        </Button>
      </div>

      <div className="new-content">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <h1>User Dashboard</h1>
            <p>Welcome to your dashboard</p>

            <Row>
              <Col md="4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Total Leads</CardTitle>
                    <CardText>{totalLeads}</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">New Leads</CardTitle>
                    <CardText>{newLeadsCount}</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Closed Leads</CardTitle>
                    <CardText>{closedLeadsCount}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <PieChart data={{ totalLeads, newLeadsCount, closedLeadsCount }} size={{ width: 300, height: 300 }} />
              </Col>
              <Col md="6">
                <LineChart data={leads} size={{ width: 400, height: 300 }} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <h2>Leads</h2>
            {loading && <Spinner color="primary" />}
            {error && <Alert color="danger">{error}</Alert>}
            {leads.length > 0 ? (
              <Row className="new-lead-list">
                {leads.map(lead => (
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
                        <CardText>
                          <strong>Source:</strong> {lead.lead_source}
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
                    <strong>Title:</strong> {selectedLead.title}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedLead.email}
                  </p>
                  <p>
                    <strong>Fax:</strong> {selectedLead.fax}
                  </p>
                  <p>
                    <strong>Website:</strong> {selectedLead.website}
                  </p>
                  <p>
                    <strong>Lead Source:</strong> {selectedLead.lead_source}
                  </p>
                  <p>
                    <strong>Lead Status:</strong> {selectedLead.lead_status}
                  </p>
                  <p>
                    <strong>Industry:</strong> {selectedLead.industry}
                  </p>
                  <p>
                    <strong>Number of Employees:</strong> {selectedLead.no_of_emp}
                  </p>
                  <p>
                    <strong>Annual Revenue:</strong> {selectedLead.annual_revenue}
                  </p>
                  <p>
                    <strong>Rating:</strong> {selectedLead.rating}
                  </p>
                  <p>
                    <strong>Social Media:</strong> {selectedLead.social_media}
                  </p>
                  <p>
                    <strong>Handle ID:</strong> {selectedLead.media_handle_id}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedLead.street}, {selectedLead.city}, {selectedLead.state}, {selectedLead.zipcode},{' '}
                    {selectedLead.country}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedLead.description}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => toggleModal(null)}>
                    Close
                  </Button>
                  <Button color="danger" onClick={() => closeLead(selectedLead.id)}>
                    Close Lead
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          </TabPane>
          <TabPane tabId="3">
            <h2>Services</h2>
            <p>Here you can manage your services.</p>
          </TabPane>
          <TabPane tabId="4">
            <h2>Settings</h2>
            <p>Configure your application settings here.</p>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default NewDashboard;
