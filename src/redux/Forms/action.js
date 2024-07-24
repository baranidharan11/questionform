// src/actions/index.js
export const FETCH_FORMS = "FETCH_FORMS";
export const FETCH_FORMS_SUCCESS = "FETCH_FORMS_SUCCESS";
export const FETCH_FORM = "FETCH_FORM";
export const FETCH_FORM_SUCCESS = "FETCH_FORM_SUCCESS";
export const CREATE_FORM = "CREATE_FORM";
export const CREATE_FORM_SUCCESS = "CREATE_FORM_SUCCESS";
export const EDIT_FORM = "EDIT_FORM";
export const EDIT_FORM_SUCCESS = "EDIT_FORM_SUCCESS";
export const DELETE_FORM = "DELETE_FORM";
export const DELETE_FORM_SUCCESS = "DELETE_FORM_SUCCESS";
export const SUBMIT_RESPONSE = "SUBMIT_RESPONSE";
export const SUBMIT_RESPONSE_SUCCESS = "SUBMIT_RESPONSE_SUCCESS";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const FETCH_FORM_BY_ID_SUCCESS = "FETCH_FORM_BY_ID_SUCCESS";

export const fetchFormByIdSuccess = (form) => ({
  type: FETCH_FORM_BY_ID_SUCCESS,
  payload: form,
});

export const fetchFormById = (formId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/api/forms/${formId}`);
    const form = await response.json();
    dispatch(fetchFormByIdSuccess(form));
  } catch (error) {
    console.error("Error fetching form:", error);
  }
};

export const fetchForms = () => ({
  type: FETCH_FORMS,
});

export const fetchFormsSuccess = (forms) => ({
  type: FETCH_FORMS_SUCCESS,
  payload: forms,
});

export const fetchForm = (formId) => ({
  type: FETCH_FORM,
  payload: formId,
});

export const fetchFormSuccess = (form) => ({
  type: FETCH_FORM_SUCCESS,
  payload: form,
});

export const createForm = (form) => ({
  type: CREATE_FORM,
  payload: form,
});

export const createFormSuccess = (form) => ({
  type: CREATE_FORM_SUCCESS,
  payload: form,
});

export const editForm = (formId, form) => ({
  type: EDIT_FORM,
  payload: { formId, form },
});

export const editFormSuccess = (form) => ({
  type: EDIT_FORM_SUCCESS,
  payload: form,
});

export const deleteForm = (formId) => ({
  type: DELETE_FORM,
  payload: formId,
});

export const deleteFormSuccess = (formId) => ({
  type: DELETE_FORM_SUCCESS,
  payload: formId,
});

export const submitResponse = (response) => ({
  type: SUBMIT_RESPONSE,
  payload: response,
});

export const submitResponseSuccess = (response) => ({
  type: SUBMIT_RESPONSE_SUCCESS,
  payload: response,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
