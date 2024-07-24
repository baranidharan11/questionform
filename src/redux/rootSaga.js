import { all } from "redux-saga/effects";
import formSaga from "./Forms/saga";

export default function* rootSaga() {
  yield all([formSaga()]);
}
