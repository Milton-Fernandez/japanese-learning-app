import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* removeDataSaga(action) {
    try {
        yield axios.delete(`/form/delete/${action.payload}`);
        yield put({ type: 'FORM_DATA' });
    } catch (error) {
        console.log('Error in delete', error);
    };
};

function* deleteDataSaga() {
    yield takeEvery('REMOVE_DATA', removeDataSaga);
}

export default deleteDataSaga;