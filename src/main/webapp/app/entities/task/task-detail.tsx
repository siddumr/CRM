import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './task.reducer';

export const TaskDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const taskEntity = useAppSelector(state => state.task.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskDetailsHeading">
          <Translate contentKey="crmApp.task.detail.title">Task</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskEntity.id}</dd>
          <dt>
            <span id="subject">
              <Translate contentKey="crmApp.task.subject">Subject</Translate>
            </span>
          </dt>
          <dd>{taskEntity.subject}</dd>
          <dt>
            <span id="due_Date">
              <Translate contentKey="crmApp.task.due_Date">Due Date</Translate>
            </span>
          </dt>
          <dd>{taskEntity.due_Date ? <TextFormat value={taskEntity.due_Date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="crmApp.task.status">Status</Translate>
            </span>
          </dt>
          <dd>{taskEntity.status}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="crmApp.task.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{taskEntity.priority}</dd>
          <dt>
            <span id="related_to">
              <Translate contentKey="crmApp.task.related_to">Related To</Translate>
            </span>
          </dt>
          <dd>{taskEntity.related_to}</dd>
          <dt>
            <span id="task_Owner">
              <Translate contentKey="crmApp.task.task_Owner">Task Owner</Translate>
            </span>
          </dt>
          <dd>{taskEntity.task_Owner}</dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaskDetail;
