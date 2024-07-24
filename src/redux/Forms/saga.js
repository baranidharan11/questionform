// src/sagas/index.js
import { takeEvery, call, put } from "redux-saga/effects";
import {
  FETCH_FORMS,
  fetchFormsSuccess,
  FETCH_FORM,
  fetchFormSuccess,
  CREATE_FORM,
  createFormSuccess,
  EDIT_FORM,
  editFormSuccess,
  DELETE_FORM,
  deleteFormSuccess,
  SUBMIT_RESPONSE,
  submitResponseSuccess,
  setError,
} from "./action";

// Helper function to handle API calls
function* apiCall(method, url, data) {
  try {
    const response = yield call(fetch, url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = yield response.json();
    if (!response.ok) throw new Error(result.message || "Something went wrong");
    return result;
  } catch (error) {
    yield put(setError(error.message));
    return null;
  }
}

// Fetch forms saga
function* fetchFormsSaga() {
  const forms = yield apiCall("GET", "http://localhost:5000/api/forms");
  if (forms) yield put(fetchFormsSuccess(forms));
}

// Fetch a single form saga
function* fetchFormSaga(action) {
  const form = yield apiCall(
    "GET",
    `http://localhost:5000/api/forms/${action.payload}`
  );
  if (form) yield put(fetchFormSuccess(form));
}

// Create form saga
function* createFormSaga(action) {
  const form = yield apiCall(
    "POST",
    "http://localhost:5000/api/forms/create",
    action.payload
  );
  if (form) yield put(createFormSuccess(form));
}

// Edit form saga
function* editFormSaga(action) {
  const form = yield apiCall(
    "PUT",
    `http://localhost:5000/api/forms/${action.payload.formId}`,
    action.payload.form
  );
  if (form) yield put(editFormSuccess(form));
}

// Delete form saga
function* deleteFormSaga(action) {
  const success = yield apiCall(
    "DELETE",
    `http://localhost:5000/api/forms/${action.payload}`
  );
  if (success) yield put(deleteFormSuccess(action.payload));
}

// Submit response saga
function* submitResponseSaga(action) {
  const response = yield apiCall(
    "POST",
    "http://localhost:5000/api/responses",
    action.payload
  );
  if (response) yield put(submitResponseSuccess(response));
}

// Root saga to manage all watchers
export default function* rootSaga() {
  yield takeEvery(FETCH_FORMS, fetchFormsSaga);
  yield takeEvery(FETCH_FORM, fetchFormSaga);
  yield takeEvery(CREATE_FORM, createFormSaga);
  yield takeEvery(EDIT_FORM, editFormSaga);
  yield takeEvery(DELETE_FORM, deleteFormSaga);
  yield takeEvery(SUBMIT_RESPONSE, submitResponseSaga);
}
