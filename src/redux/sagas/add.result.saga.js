import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* addResultSaga(action) {
    try {
        yield axios.post('/result/add', action.payload);

    } catch (error) {
        console.log('Error in add', error);
    };
};


function* resultSaga() {
    yield takeEvery('ADD_DATA', addResultSaga);
}
export default resultSaga;