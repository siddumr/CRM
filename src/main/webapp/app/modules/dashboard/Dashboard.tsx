import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTasks, faUsers, faCog, faAddressBook, faBuilding } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss';
import Leads from './Leads';
import Contacts from './Contacts';
import DashboardSection from './DashboardSection';
import Meeting from './Meeting'; // Import the Meeting component

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
}

const NewDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('1');

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
        <Button className={classnames({ active: activeTab === '5' })} onClick={() => changeTab('5')}>
          <FontAwesomeIcon icon={faAddressBook} /> Contacts
        </Button>
        <Button className={classnames({ active: activeTab === '3' })} onClick={() => changeTab('3')}>
          <FontAwesomeIcon icon={faUsers} /> Meetings
        </Button>
        <Button className={classnames({ active: activeTab === '6' })} onClick={() => changeTab('6')}>
          <FontAwesomeIcon icon={faBuilding} /> Accounts
        </Button>
        <Button className={classnames({ active: activeTab === '7' })} onClick={() => changeTab('7')}>
          <FontAwesomeIcon icon={faTasks} /> Tasks
        </Button>
        <Button className={classnames({ active: activeTab === '4' })} onClick={() => changeTab('4')}>
          <FontAwesomeIcon icon={faCog} /> Settings
        </Button>
      </div>

      <div className="new-content">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <DashboardSection leads={leads} />
          </TabPane>
          <TabPane tabId="2">
            <Leads />
          </TabPane>
          <TabPane tabId="3">
            <Meeting /> {/* Add the Meeting component here */}
          </TabPane>
          <TabPane tabId="5">
            <Contacts />
          </TabPane>
          <TabPane tabId="6">
            <h2>Accounts</h2>
            <p>Details about accounts will be here.</p>
          </TabPane>
          <TabPane tabId="7">
            <h2>Tasks</h2>
            <p>Details about tasks will be here.</p>
          </TabPane>
          <TabPane tabId="4">
            <h2>Settings</h2>
            <p>Settings content will be here.</p>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default NewDashboard;
