import {
  SET_MIRROR_GRADE,
  RESTORE_MIRROR_GRADE,
  UPDATE_MIRROR_SCHOLARYEAR,
  UPDATE_MIRROR_SECTION,
  ADD_MIRROR_SECTION,
  DELETE_MIRROR_SECTION
} from '../actions/mirrorGradeActions';

const initialState = {
  grade: {
    idGrade: 0,
    scholarYear: '',
    sectionsNumber: 0,
    gradesSections: {}
  },
  deleted: []
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_MIRROR_GRADE:
      return { ...state, grade: { ...payload.grade } };

    case UPDATE_MIRROR_SCHOLARYEAR:
      return {
        ...state,
        grade: { ...state.grade, scholarYear: payload.scholarYear }
      };

    case ADD_MIRROR_SECTION: {
      const newSection = {
        ...payload.section,
        idSection: payload.section.id,
        idGrade: state.grade.idGrade
      };
      delete newSection.id;

      const gradesSections = {
        ...state.grade.gradesSections,
        [newSection.idSection]: newSection
      };

      return {
        ...state,
        grade: { ...state.grade, gradesSections }
      };
    }

    case UPDATE_MIRROR_SECTION: {
      const newSection = {
        ...payload.section,
        idSection: payload.section.id,
        idGrade: state.grade.idGrade
      };
      delete newSection.id;

      const gradesSections = {
        ...state.grade.gradesSections,
        [newSection.idSection]: newSection
      };

      return {
        ...state,
        grade: { ...state.grade, gradesSections }
      };
    }

    case DELETE_MIRROR_SECTION: {
      const gradesSections = { ...state.grade.gradesSections };
      delete gradesSections[payload.idSection];
      const deleted = [...state.deleted];
      if (payload.idSection > 0) deleted.push(payload.idSection);
      return {
        ...state,
        grade: { ...state.grade, gradesSections },
        deleted
      };
    }

    case RESTORE_MIRROR_GRADE: {
      console.log('hola');
      console.log(initialState);
      return { ...initialState };
    }

    default:
      return state;
  }
}
