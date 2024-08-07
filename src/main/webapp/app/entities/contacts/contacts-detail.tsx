import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './contacts.reducer';

export const ContactsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const contactsEntity = useAppSelector(state => state.contacts.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contactsDetailsHeading">
          <Translate contentKey="crmApp.contacts.detail.title">Contacts</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{contactsEntity.id}</dd>
          <dt>
            <span id="contact_Name">
              <Translate contentKey="crmApp.contacts.contact_Name">Contact Name</Translate>
            </span>
          </dt>
          <dd>{contactsEntity.contact_Name}</dd>
          <dt>
            <span id="account_Name">
              <Translate contentKey="crmApp.contacts.account_Name">Account Name</Translate>
            </span>
          </dt>
          <dd>{contactsEntity.account_Name}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="crmApp.contacts.email">Email</Translate>
            </span>
          </dt>
          <dd>{contactsEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="crmApp.contacts.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{contactsEntity.phone}</dd>
          <dt>
            <span id="contact_Owner">
              <Translate contentKey="crmApp.contacts.contact_Owner">Contact Owner</Translate>
            </span>
          </dt>
          <dd>{contactsEntity.contact_Owner}</dd>
        </dl>
        <Button tag={Link} to="/contacts" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contacts/${contactsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ContactsDetail;
