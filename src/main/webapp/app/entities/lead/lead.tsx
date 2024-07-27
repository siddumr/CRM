import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './lead.reducer';

export const Lead = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const leadList = useAppSelector(state => state.lead.entities);
  const loading = useAppSelector(state => state.lead.loading);
  const totalItems = useAppSelector(state => state.lead.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="lead-heading" data-cy="LeadHeading">
        <Translate contentKey="crmApp.lead.home.title">Leads</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="crmApp.lead.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/lead/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="crmApp.lead.home.createLabel">Create new Lead</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {leadList && leadList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="crmApp.lead.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('first_name')}>
                  <Translate contentKey="crmApp.lead.first_name">First Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('first_name')} />
                </th>
                <th className="hand" onClick={sort('last_name')}>
                  <Translate contentKey="crmApp.lead.last_name">Last Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('last_name')} />
                </th>
                <th className="hand" onClick={sort('company')}>
                  <Translate contentKey="crmApp.lead.company">Company</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('company')} />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="crmApp.lead.title">Title</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="crmApp.lead.phone">Phone</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('phone')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="crmApp.lead.email">Email</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('fax')}>
                  <Translate contentKey="crmApp.lead.fax">Fax</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('fax')} />
                </th>
                <th className="hand" onClick={sort('website')}>
                  <Translate contentKey="crmApp.lead.website">Website</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('website')} />
                </th>
                <th className="hand" onClick={sort('industry')}>
                  <Translate contentKey="crmApp.lead.industry">Industry</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('industry')} />
                </th>
                <th className="hand" onClick={sort('no_of_employees')}>
                  <Translate contentKey="crmApp.lead.no_of_employees">No Of Employees</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('no_of_employees')} />
                </th>
                <th className="hand" onClick={sort('annual_Revenue')}>
                  <Translate contentKey="crmApp.lead.annual_Revenue">Annual Revenue</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('annual_Revenue')} />
                </th>
                <th className="hand" onClick={sort('street')}>
                  <Translate contentKey="crmApp.lead.street">Street</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('street')} />
                </th>
                <th className="hand" onClick={sort('state')}>
                  <Translate contentKey="crmApp.lead.state">State</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('state')} />
                </th>
                <th className="hand" onClick={sort('zip_code')}>
                  <Translate contentKey="crmApp.lead.zip_code">Zip Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('zip_code')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="crmApp.lead.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {leadList.map((lead, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/lead/${lead.id}`} color="link" size="sm">
                      {lead.id}
                    </Button>
                  </td>
                  <td>{lead.first_name}</td>
                  <td>{lead.last_name}</td>
                  <td>{lead.company}</td>
                  <td>{lead.title}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.email}</td>
                  <td>{lead.fax}</td>
                  <td>{lead.website}</td>
                  <td>{lead.industry}</td>
                  <td>{lead.no_of_employees}</td>
                  <td>{lead.annual_Revenue}</td>
                  <td>{lead.street}</td>
                  <td>{lead.state}</td>
                  <td>{lead.zip_code}</td>
                  <td>{lead.description}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/lead/${lead.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/lead/${lead.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/lead/${lead.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="crmApp.lead.home.notFound">No Leads found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={leadList && leadList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Lead;
