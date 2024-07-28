import './footer.scss';

import React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="4" className="footer-section">
        <h5>About Us</h5>
        <p>
          We are a leading company in CRM solutions, dedicated to helping you manage your customer relationships effectively and
          efficiently.
        </p>
      </Col>
      <Col md="4" className="footer-section">
        <h5>Contact Us</h5>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> info@servocrm.com
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> 9786036555
        </p>
      </Col>
      <Col md="4" className="footer-section">
        <h5>Follow Us</h5>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col md="12" className="text-center">
        <p>&copy; 2024 ServoCrm. All rights reserved.</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
