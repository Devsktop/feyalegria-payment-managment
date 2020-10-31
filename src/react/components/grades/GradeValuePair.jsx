import React from 'react';
import { createSelector } from 'reselect';
// Actions
import {
  addMirrorSection,
  updateMirrorSection,
  deleteMirrorSection
} from 'react/redux/actions/mirrorGradeActions';

// Components
import AddValuePair from '../valuePair/AddValuePair';

// Selectors
const boxSelector = state => {
  const { gradesSections } = state.mirrorGrade.grade;

  const gradesSectionsKeys = {};

  Object.keys(gradesSections).forEach(section => {
    gradesSectionsKeys[section] = section;
  });

  return gradesSectionsKeys;
};

const sectionSelector = createSelector(
  state => {
    const { gradesSections } = state.mirrorGrade.grade;

    return gradesSections;
  },
  (_, id) => id,
  (gradesSections, id) => gradesSections[id]
);

const GradeValuePair = () => {
  return (
    <AddValuePair
      boxSelector={boxSelector}
      addPairAction={addMirrorSection}
      changePairAction={updateMirrorSection}
      pairSelector={sectionSelector}
      removePairAction={deleteMirrorSection}
      pairKeys={['section', 'capacity']}
      pairLabels={['Sección', 'Capacidad']}
      type=""
    />
  );
};

export default React.memo(GradeValuePair);
