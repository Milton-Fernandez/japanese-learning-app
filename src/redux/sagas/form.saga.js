import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchFormSaga(action) {
    try {
        let response = yield axios.get('/form');
        yield put({ type: 'SET_FORM_DATA', payload: response.data });
    } catch (error) {
        console.log('ERROR in fetch', error);
    };
};


function* formSaga() {
    yield takeEvery('FORM_DATA', fetchFormSaga);
}

export default formSaga;