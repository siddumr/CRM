import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './lead.reducer';

export const LeadDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const leadEntity = useAppSelector(state => state.lead.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="leadDetailsHeading">
          <Translate contentKey="crmApp.lead.detail.title">Lead</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{leadEntity.id}</dd>
          <dt>
            <span id="first_name">
              <Translate contentKey="crmApp.lead.first_name">First Name</Translate>
            </span>
          </dt>
          <dd>{leadEntity.first_name}</dd>
          <dt>
            <span id="last_name">
              <Translate contentKey="crmApp.lead.last_name">Last Name</Translate>
            </span>
          </dt>
          <dd>{leadEntity.last_name}</dd>
          <dt>
            <span id="company">
              <Translate contentKey="crmApp.lead.company">Company</Translate>
            </span>
          </dt>
          <dd>{leadEntity.company}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="crmApp.lead.title">Title</Translate>
            </span>
          </dt>
          <dd>{leadEntity.title}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="crmApp.lead.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{leadEntity.phone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="crmApp.lead.email">Email</Translate>
            </span>
          </dt>
          <dd>{leadEntity.email}</dd>
          <dt>
            <span id="fax">
              <Translate contentKey="crmApp.lead.fax">Fax</Translate>
            </span>
          </dt>
          <dd>{leadEntity.fax}</dd>
          <dt>
            <span id="website">
              <Translate contentKey="crmApp.lead.website">Website</Translate>
            </span>
          </dt>
          <dd>{leadEntity.website}</dd>
          <dt>
            <span id="industry">
              <Translate contentKey="crmApp.lead.industry">Industry</Translate>
            </span>
          </dt>
          <dd>{leadEntity.industry}</dd>
          <dt>
            <span id="no_of_employees">
              <Translate contentKey="crmApp.lead.no_of_employees">No Of Employees</Translate>
            </span>
          </dt>
          <dd>{leadEntity.no_of_employees}</dd>
          <dt>
            <span id="annual_Revenue">
              <Translate contentKey="crmApp.lead.annual_Revenue">Annual Revenue</Translate>
            </span>
          </dt>
          <dd>{leadEntity.annual_Revenue}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="crmApp.lead.street">Street</Translate>
            </span>
          </dt>
          <dd>{leadEntity.street}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="crmApp.lead.state">State</Translate>
            </span>
          </dt>
          <dd>{leadEntity.state}</dd>
          <dt>
            <span id="zip_code">
              <Translate contentKey="crmApp.lead.zip_code">Zip Code</Translate>
            </span>
          </dt>
          <dd>{leadEntity.zip_code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="crmApp.lead.description">Description</Translate>
            </span>
          </dt>
          <dd>{leadEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/lead" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lead/${leadEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LeadDetail;
