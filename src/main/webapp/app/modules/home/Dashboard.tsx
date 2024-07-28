import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faTasks, faEnvelope, faFileAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <Container>
      <h1 className="display-4 text-center">CRM Dashboard</h1>
      <Row className="mt-4">
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">
                <FontAwesomeIcon icon={faUsers} /> Customer List
              </CardTitle>
              <CardText>Manage your customers here.</CardText>
              <ListGroup flush>
                <ListGroupItem>Customer 1</ListGroupItem>
                <ListGroupItem>Customer 2</ListGroupItem>
                <ListGroupItem>Customer 3</ListGroupItem>
              </ListGroup>
              <Button color="primary" block className="mt-3">
                View All Customers
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">
                <FontAwesomeIcon icon={faClock} /> Recent Activities
              </CardTitle>
              <CardText>Track recent customer interactions.</CardText>
              <ListGroup flush>
                <ListGroupItem>Activity 1</ListGroupItem>
                <ListGroupItem>Activity 2</ListGroupItem>
                <ListGroupItem>Activity 3</ListGroupItem>
              </ListGroup>
              <Button color="primary" block className="mt-3">
                View All Activities
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">
                <FontAwesomeIcon icon={faChartLine} /> Sales Statistics
              </CardTitle>
              <CardText>Analyze your sales performance.</CardText>
              <ListGroup flush>
                <ListGroupItem>Today's Sales: $1000</ListGroupItem>
                <ListGroupItem>This Week: $5000</ListGroupItem>
                <ListGroupItem>This Month: $20000</ListGroupItem>
              </ListGroup>
              <Button color="primary" block className="mt-3">
                View Detailed Sales
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">
                <FontAwesomeIcon icon={faTasks} /> Tasks
              </CardTitle>
              <CardText>Organize and manage your tasks.</CardText>
              <ListGroup flush>
                <ListGroupItem>Task 1: Meeting at 3 PM</ListGroupItem>
                <ListGroupItem>Task 2: Follow up with Client A</ListGroupItem>
                <ListGroupItem>Task 3: Prepare report</ListGroupItem>
              </ListGroup>
              <Button color="primary" block className="mt-3">
                View All Tasks
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">
                <FontAwesomeIcon icon={faEnvelope} /> Messages
              </CardTitle>
              <CardText>Check your messages.</CardText>
              <ListGroup flush>
                <ListGroupItem>Message from Client B</ListGroupItem>
                <ListGroupItem>Follow-up on Proposal</ListGroupItem>
                <ListGroupItem>Team Meeting Notes</ListGroupItem>
              </ListGroup>
              <Button color="primary" block className="mt-3">
                View All Messages
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle tag="h5">
                <FontAwesomeIcon icon={faFileAlt} /> Reports
              </CardTitle>
              <CardText>Generate and view reports.</CardText>
              <ListGroup flush>
                <ListGroupItem>Monthly Sales Report</ListGroupItem>
                <ListGroupItem>Customer Feedback Report</ListGroupItem>
                <ListGroupItem>Performance Analysis</ListGroupItem>
              </ListGroup>
              <Button color="primary" block className="mt-3">
                View All Reports
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
