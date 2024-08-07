import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './meeting.reducer';

export const MeetingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const meetingEntity = useAppSelector(state => state.meeting.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="meetingDetailsHeading">
          <Translate contentKey="crmApp.meeting.detail.title">Meeting</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="crmApp.meeting.title">Title</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.title}</dd>
          <dt>
            <span id="from">
              <Translate contentKey="crmApp.meeting.from">From</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.from ? <TextFormat value={meetingEntity.from} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="to">
              <Translate contentKey="crmApp.meeting.to">To</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.to ? <TextFormat value={meetingEntity.to} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="realated_to">
              <Translate contentKey="crmApp.meeting.realated_to">Realated To</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.realated_to}</dd>
          <dt>
            <span id="contact_name">
              <Translate contentKey="crmApp.meeting.contact_name">Contact Name</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.contact_name}</dd>
          <dt>
            <span id="host">
              <Translate contentKey="crmApp.meeting.host">Host</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.host}</dd>
        </dl>
        <Button tag={Link} to="/meeting" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/meeting/${meetingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MeetingDetail;
