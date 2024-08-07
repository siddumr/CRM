import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import PieChart from './PieChart';
import LineChart from './LineChart';
import BarChart from './BarChart';

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

interface DashboardSectionProps {
  leads: Lead[];
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
  const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;

  const leadsByMonth = leads.reduce((acc: { [key: string]: number }, lead) => {
    const month = new Date(lead.created_at).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(leadsByMonth),
    values: Object.values(leadsByMonth),
  };

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

      <Row>
        <Col md="6">
          <BarChart data={barChartData} size={{ width: 400, height: 300 }} />
        </Col>
      </Row>
    </>
  );
};

export default DashboardSection;
