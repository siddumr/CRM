import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import PieChart from './PieChart';
import BarChart from './BarChart';
import GaugeChart from './GaugeChart';
import CustomRadarChart from './CustomRadarChart'; // Import the CustomRadarChart component
import axios from 'axios';

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

interface Meeting {
  id: number;
  title: string;
  from: string;
  to: string;
  related_to: string;
  contact_name: string;
  host: string;
}

interface Task {
  id: number;
  subject: string;
  due_Date: string;
  status: string;
  priority: string;
  related_to: string;
  task_Owner: string;
}

interface DashboardSectionProps {
  leads: Lead[];
  contacts: number;
  meetings: Meeting[];
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ leads, contacts, meetings }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const totalLeads = leads.length;
  const totalMeetings = meetings.length;
  const totalContacts = contacts;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks'); // Adjust the endpoint as needed
        const fetchedTasks: Task[] = response.data;
        setTasks(fetchedTasks);

        const completedCount = fetchedTasks.filter(task => task.status === 'Completed').length;
        setCompletedTasks(completedCount);
        setTotalTasks(fetchedTasks.length);
      } catch (err) {
        console.error('Error fetching tasks data', err);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log('Completed Tasks:', completedTasks);
    console.log('Total Tasks:', totalTasks);
  }, [completedTasks, totalTasks]);

  const leadsByMonth = leads.reduce((acc: { [key: string]: number }, lead) => {
    const month = new Date(lead.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(leadsByMonth),
    datasets: [
      {
        label: 'Leads',
        values: Object.values(leadsByMonth),
        backgroundColor: '#FF6384',
      },
      {
        label: 'Contacts',
        values: new Array(Object.keys(leadsByMonth).length).fill(totalContacts),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Meetings',
        values: new Array(Object.keys(leadsByMonth).length).fill(totalMeetings),
        backgroundColor: '#FFCE56',
      },
    ],
  };

  const radarChartData = [
    { subject: 'Leads', value: totalLeads },
    { subject: 'Contacts', value: totalContacts },
    { subject: 'Meetings', value: totalMeetings },
    { subject: 'Tasks', value: totalTasks },
    { subject: 'Completed Tasks', value: completedTasks },
  ];

  return (
    <>
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
              <CardTitle tag="h5">Total Contacts</CardTitle>
              <CardText>{totalContacts}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Meetings</CardTitle>
              <CardText>{totalMeetings}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '50px' }}>
        <Col md="6">
          <PieChart data={{ totalLeads, totalContacts, totalMeetings }} size={{ width: 300, height: 300 }} />
        </Col>
        <Col md="6">
          <BarChart data={barChartData} size={{ width: 400, height: 300 }} />
        </Col>
      </Row>

      <Row style={{ marginTop: '50px' }}>
        <Col md="6">
          <CustomRadarChart data={radarChartData} />
        </Col>
        <Col md="6">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Task Completion</CardTitle>
              <GaugeChart gaugeValue={completedTasks} maxValue={totalTasks} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardSection;
