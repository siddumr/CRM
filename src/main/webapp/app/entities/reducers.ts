import lead from 'app/entities/lead/lead.reducer';
import contacts from 'app/entities/contacts/contacts.reducer';
import meeting from 'app/entities/meeting/meeting.reducer';
import task from 'app/entities/task/task.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  lead,
  contacts,
  meeting,
  task,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
