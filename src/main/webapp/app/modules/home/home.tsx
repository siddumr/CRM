import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button, Collapse, CardHeader, Card as AccordionCard, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faTasks, faEnvelope, faFileAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'app/config/store';

import './home.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (account?.login) {
      if (account.authorities?.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [account?.login, account?.authorities, navigate]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
  };

  return (
    <div className="crm-container">
      {!account?.login ? (
        <div className="text-center">
          <h1 className="display-4">Welcome to Our CRM</h1>
          <p className="lead">Manage your customer relationships effortlessly with our CRM system.</p>
          <div className="slider-container">
            <Slider {...sliderSettings}>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/3d-cartoon-scene-depicting-variety-people-multitasking_23-2151294503.jpg?t=st=1722147583~exp=1722151183~hmac=91e8d9a9fe71a4e55a67344f80d8f7b0ecd9ec137e40452a9e6e2e7a6a294484&w=996"
                  alt="Slide 1"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/customer-relationship-management-concept_23-2150038418.jpg?ga=GA1.1.688353063.1686149813&semt=sph"
                  alt="Slide 2"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041867.jpg?ga=GA1.1.688353063.1686149813&semt=sph"
                  alt="Slide 3"
                  className="img-fluid"
                />
              </div>
            </Slider>
          </div>
          {/* Our Services Section */}
          <div className="our-services-container mt-5">
            <h2 className="text-center mb-4">Our Services</h2>
            <p className="ourservice">
              Discover our wide range of services designed to help you manage customer relationships, analyze sales performance, and more.
              Our CRM system offers a comprehensive solution to meet your business needs. From intuitive customer management tools to
              advanced sales analytics, we provide everything you need to grow your business. Our task management features ensure that you
              stay organized and on top of your priorities. With integrated messaging and detailed reporting capabilities, our CRM helps you
              communicate effectively and make data-driven decisions. Experience the power of seamless customer relationship management with
              our robust and user-friendly system.
            </p>
          </div>
          <Row className="mt-4">
            <Col md="4">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">
                    <FontAwesomeIcon icon={faUsers} /> Manage Customers
                  </CardTitle>
                  <img
                    src="https://img.freepik.com/free-photo/rag-doll-blue-with-arms-two_1156-238.jpg?ga=GA1.1.688353063.1686149813&semt=ais_user"
                    alt="Manage Customers"
                    className="cardimage"
                  />
                  <CardText>Keep track of your customers and their interactions.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">
                    <FontAwesomeIcon icon={faChartLine} /> Sales Analytics
                  </CardTitle>
                  <img
                    src="https://img.freepik.com/free-photo/rag-doll-pointing-with-stick-one-bar-graph_1156-260.jpg?ga=GA1.1.688353063.1686149813&semt=ais_user"
                    alt="Sales Analytics"
                    className="cardimage"
                  />
                  <CardText>Analyze your sales data to improve performance.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">
                    <FontAwesomeIcon icon={faTasks} /> Task Management
                  </CardTitle>
                  <img
                    src="https://img.freepik.com/free-photo/rag-doll-with-red-pencil-checklist_1156-217.jpg?ga=GA1.1.688353063.1686149813&semt=ais_user"
                    alt="Task Management"
                    className="cardimage"
                  />
                  <CardText>Organize and prioritize your tasks efficiently.</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="6">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">
                    <FontAwesomeIcon icon={faEnvelope} /> Communication
                  </CardTitle>
                  <img
                    src="https://img.freepik.com/free-photo/rag-dolls-red-circles_1156-232.jpg?ga=GA1.1.688353063.1686149813&semt=ais_user"
                    alt="Communication"
                    className="cardimage"
                  />
                  <CardText>Communicate with your clients through integrated messaging.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle tag="h5">
                    <FontAwesomeIcon icon={faFileAlt} /> Reporting
                  </CardTitle>
                  <img
                    src="https://img.freepik.com/free-photo/rag-doll-teaching-bar-graph-others-rag-dolls_1156-247.jpg?ga=GA1.1.688353063.1686149813&semt=ais_user"
                    alt="Reporting"
                    className="cardimage"
                  />
                  <CardText>Generate detailed reports to track your progress.</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="6">
              <h2>Testimonials</h2>
              <Card className="mb-4">
                <CardBody>
                  <CardText>"This CRM has transformed the way we manage our customer relationships!" - A Satisfied User</CardText>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardBody>
                  <CardText>"Our sales have increased by 50% since we started using this CRM." - Another Happy Customer</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <h2>Get Started</h2>
              <Card className="mb-4">
                <CardBody>
                  <CardText>Sign up today and take your business to the next level with our powerful CRM tools.</CardText>
                  <Button color="primary" size="lg" block>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                      View Demo
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Latest News Accordion */}
          <Container className="latest-news-container mt-4">
            <h2 className="text-center">Latest News</h2>
            <AccordionCard>
              <CardHeader onClick={() => setCollapseOpen(!collapseOpen)} style={{ cursor: 'pointer' }}>
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faNewspaper} /> Click Here
                </h5>
              </CardHeader>
              <Collapse isOpen={collapseOpen}>
                <CardBody>
                  <Row className="mt-4">
                    <Col md="6">
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle tag="h5">
                            <FontAwesomeIcon icon={faNewspaper} /> New Feature Release
                          </CardTitle>
                          <CardText>We have just released a new feature that will help you manage your customers even better!</CardText>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6">
                      <Card className="mb-4">
                        <CardBody>
                          <CardTitle tag="h5">
                            <FontAwesomeIcon icon={faNewspaper} /> Upcoming Webinar
                          </CardTitle>
                          <CardText>
                            Join our upcoming webinar to learn about the latest trends in customer relationship management.
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Collapse>
            </AccordionCard>
          </Container>
          {/* New Image Section */}
          <div className="new-image-container mt-4">
            <img src="content/images/crm_banner.png" alt="New Image" className="bannerimage" />
          </div>
        </div>
      ) : (
        <div className="crm-dashboard-container">
          <h1 className="display-4 text-center">CRM Dashboard</h1>
          <Row className="mt-4">{/* CRM Dashboard Cards */}</Row>
        </div>
      )}
    </div>
  );
};

export default Home;
