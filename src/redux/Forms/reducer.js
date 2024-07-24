// src/reducers/index.js
import {
  FETCH_FORMS_SUCCESS,
  FETCH_FORM_SUCCESS,
  CREATE_FORM_SUCCESS,
  EDIT_FORM_SUCCESS,
  DELETE_FORM_SUCCESS,
  SUBMIT_RESPONSE_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
} from "./action";

const initialState = {
  forms: [],
  currentForm: null,
  responses: [],
  error: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORMS_SUCCESS:
      return {
        ...state,
        forms: action.payload,
      };
    case FETCH_FORM_SUCCESS:
      return {
        ...state,
        currentForm: action.payload,
      };
    case CREATE_FORM_SUCCESS:
      return {
        ...state,
        forms: [...state.forms, action.payload],
      };
    case EDIT_FORM_SUCCESS:
      return {
        ...state,
        forms: state.forms.map((form) =>
          form._id === action.payload._id ? action.payload : form
        ),
      };
    case DELETE_FORM_SUCCESS:
      return {
        ...state,
        forms: state.forms.filter((form) => form._id !== action.payload),
      };
    case SUBMIT_RESPONSE_SUCCESS:
      return {
        ...state,
        responses: [...state.responses, action.payload],
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default formReducer;
