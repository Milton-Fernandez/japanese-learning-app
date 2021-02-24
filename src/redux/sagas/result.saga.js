import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchResultSaga(action) {
    try {
        let response = yield axios.get('/result');
        yield put({ type: 'SET_RESULT', payload: response.data });

    } catch (error) {
        console.log('ERROR in fetch', error);
    };
};


function* resultSaga() {
    yield takeEvery('FETCH_RESULT', fetchResultSaga);
}

export default resultSaga;