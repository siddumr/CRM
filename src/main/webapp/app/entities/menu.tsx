import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/lead">
        <Translate contentKey="global.menu.entities.lead" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/contacts">
        <Translate contentKey="global.menu.entities.contacts" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/meeting">
        <Translate contentKey="global.menu.entities.meeting" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
