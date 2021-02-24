import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import dataSaga from './data.saga';
import addSaga from './add.data.saga';
import formSaga from './form.saga';
import flashcard from './flashcard.saga';
import remove from './delete.saga';
import addResultSaga from './add.result.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    dataSaga(),
    addSaga(),
    formSaga(),
    flashcard(),
    remove(),
    addResultSaga(),
  ]);
}
