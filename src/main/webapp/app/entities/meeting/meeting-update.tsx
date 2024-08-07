import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMeeting } from 'app/shared/model/meeting.model';
import { getEntity, updateEntity, createEntity, reset } from './meeting.reducer';

export const MeetingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const meetingEntity = useAppSelector(state => state.meeting.entity);
  const loading = useAppSelector(state => state.meeting.loading);
  const updating = useAppSelector(state => state.meeting.updating);
  const updateSuccess = useAppSelector(state => state.meeting.updateSuccess);

  const handleClose = () => {
    navigate('/meeting' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    values.from = convertDateTimeToServer(values.from);
    values.to = convertDateTimeToServer(values.to);

    const entity = {
      ...meetingEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          from: displayDefaultDateTime(),
          to: displayDefaultDateTime(),
        }
      : {
          ...meetingEntity,
          from: convertDateTimeFromServer(meetingEntity.from),
          to: convertDateTimeFromServer(meetingEntity.to),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.meeting.home.createOrEditLabel" data-cy="MeetingCreateUpdateHeading">
            <Translate contentKey="crmApp.meeting.home.createOrEditLabel">Create or edit a Meeting</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="meeting-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('crmApp.meeting.title')}
                id="meeting-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('crmApp.meeting.from')}
                id="meeting-from"
                name="from"
                data-cy="from"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('crmApp.meeting.to')}
                id="meeting-to"
                name="to"
                data-cy="to"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('crmApp.meeting.realated_to')}
                id="meeting-realated_to"
                name="realated_to"
                data-cy="realated_to"
                type="text"
              />
              <ValidatedField
                label={translate('crmApp.meeting.contact_name')}
                id="meeting-contact_name"
                name="contact_name"
                data-cy="contact_name"
                type="text"
              />
              <ValidatedField
                label={translate('crmApp.meeting.host')}
                id="meeting-host"
                name="host"
                data-cy="host"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/meeting" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MeetingUpdate;
