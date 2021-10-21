import React from 'react';

import PropTypes from 'prop-types';

import AddHeroCard from '../addHeroCard';

const createButtons = (addHero, HeroTypes, getAllowCreate, validCards, setEdit) => (
  <div>
    <AddHeroCard
      imgWidth={151}
      imgHeight={178.61}
      addHero={addHero}
      heroTypes={HeroTypes.personage}
      getAllowCreate={getAllowCreate}
      title={'Add a character'}
      img="addHero.png"
      ifValidCards={validCards}
      setEdit={setEdit}
    />

    <AddHeroCard
      imgWidth={138}
      imgHeight={177}
      addHero={addHero}
      heroTypes={HeroTypes.component}
      getAllowCreate={getAllowCreate}
      title={'Add character characteristics '}
      img="addComponent.png"
      ifValidCards={validCards}
      setEdit={setEdit}
    />

    <AddHeroCard
      imgWidth={208.9}
      imgHeight={179}
      addHero={addHero}
      heroTypes={HeroTypes.background}
      getAllowCreate={getAllowCreate}
      title={'Add background'}
      img="addDescription.png"
      ifValidCards={validCards}
      setEdit={setEdit}
    />
  </div>
);

createButtons.propTypes = {
  addHero: PropTypes.func.isRequired,
  HeroTypes: PropTypes.object.isRequired,
  getAllowCreate: PropTypes.func.isRequired,
  isValidCards: PropTypes.bool.isRequired,
  setEdit: PropTypes.func,
};

createButtons.defaultProps = {
  addHero: () => {},
  HeroTypes: {},
  getAllowCreate: () => {},
  isValidCards: false,
  setEdit: () => {},
};
export default createButtons;
